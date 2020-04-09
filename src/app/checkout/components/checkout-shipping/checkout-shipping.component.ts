import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';
import { Address, CreateAddressInput, GetAvailableCountries, GetCustomerAddresses, GetEligibleShippingMethods, GetShippingAddress, SetCustomerForOrder, SetShippingAddress, SetShippingMethod, TransitionToArrangingPayment } from '../../../common/generated-types';
import { GET_AVAILABLE_COUNTRIES, GET_CUSTOMER_ADDRESSES } from '../../../common/graphql/documents.graphql';
import { notNullOrUndefined } from '../../../common/utils/not-null-or-undefined';
import { DataService } from '../../../core/providers/data/data.service';
import { ModalService } from '../../../core/providers/modal/modal.service';
import { StateService } from '../../../core/providers/state/state.service';
import { AddressFormComponent } from '../../../shared/components/address-form/address-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    GET_ELIGIBLE_SHIPPING_METHODS,
    GET_SHIPPING_ADDRESS,
    SET_CUSTOMER_FOR_ORDER,
    SET_SHIPPING_ADDRESS,
    SET_SHIPPING_METHOD,
    TRANSITION_TO_ARRANGING_PAYMENT,
} from './checkout-shipping.graphql';
import { Location } from '@angular/common';
import { TermsConditionsModalComponent } from '../../../shared/components/terms-conditions-modal/terms-conditions-modal.component';
export type AddressFormValue = Pick<Address.Fragment, Exclude<keyof Address.Fragment, 'country'>> & { countryCode: string; };

@Component({
    selector: 'vsf-checkout-shipping',
    templateUrl: './checkout-shipping.component.html',
    styleUrls: ['./checkout-shipping.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutShippingComponent implements OnInit {
    // @ViewChild('addressForm') addressForm: AddressFormComponent;

    customerAddresses$: Observable<Address.Fragment[]>;
    availableCountries$: Observable<GetAvailableCountries.AvailableCountries[]>;
    eligibleShippingMethods$: Observable<GetEligibleShippingMethods.EligibleShippingMethods[]>;
    shippingAddress$: Observable<GetShippingAddress.ShippingAddress | null | undefined>;
    signedIn$: Observable<boolean>;
    shippingMethodId: string | undefined;
    step: 'selectAddress' | 'customerDetails' | 'editAddress' | 'selectMethod' = 'selectAddress';
    firstName = '';
    lastName = '';
    emailAddress = '';

    // my property
    order:any = null;
    collapsedMenu = false;
    displayTooltip = false;
    availableCountries:any = [];
    addressForm: FormGroup;
    currentProcess: any = false;
    activeStage: number = 0;

    openedItem = 0;
    constructor(
        private dataService: DataService,
        private stateService: StateService,
        private changeDetector: ChangeDetectorRef,
        private modalService: ModalService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private location: Location
    ) { 

        // for first init
        let url = this.location.path().split('/');
        this.currentProcess = url[url.length - 1];
        // for first init
        
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                const url = this.router.url.split('/');
                this.currentProcess = url[url.length - 1];
                switch(this.currentProcess){
                    case 'shipping' : this.activeStage = 3;
                        break;
                    case 'payment' : this.activeStage = 3;
                        break;
                    default: this.activeStage = 0;
                }
            }
        })

        this.route.data
        .subscribe((response) => {
            if(response.activeOrder) {
                response.activeOrder.subscribe((data: any) => {
                    this.order = data;
                    console.log('order', this.order);
                })
            }
        })

        this.addressForm = this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                emailAddress: ['', Validators.required],
                fullName: '',
                streetLine1: ['', Validators.required],
                streetLine2: '',
                streetLine3: '',
                city: ['', Validators.required],
                province: '',
                postalCode: ['', Validators.required],
                countryCode: ['', Validators.required],
                phoneNumber: '',
        });

        this.step = 'selectAddress';
    }

    ngOnInit() {
        this.signedIn$ = this.stateService.select(state => state.signedIn);
        this.customerAddresses$ = this.dataService.query<GetCustomerAddresses.Query>(GET_CUSTOMER_ADDRESSES).pipe(
            map(data => data.activeCustomer ? data.activeCustomer.addresses || [] : []),
        );
        this.dataService.query<GetAvailableCountries.Query>(GET_AVAILABLE_COUNTRIES)
        .subscribe((response) => {
            this.availableCountries = response.availableCountries;
        })

        this.shippingAddress$ = this.dataService.query<GetShippingAddress.Query>(GET_SHIPPING_ADDRESS).pipe(
            map(data => data.activeOrder && data.activeOrder.shippingAddress),
        );
        this.eligibleShippingMethods$ = this.shippingAddress$.pipe(
            switchMap(() => this.dataService.query<GetEligibleShippingMethods.Query>(GET_ELIGIBLE_SHIPPING_METHODS)),
            map(data => data.eligibleShippingMethods),
        );
        combineLatest(this.signedIn$, this.customerAddresses$).pipe(
            take(1),
        ).subscribe(([signedIn, addresses]) => {
            this.step = signedIn ? (addresses.length ? 'selectAddress' : 'editAddress') : 'customerDetails';
        });
    }

    getLines(address: Address.Fragment): string[] {
        return [
            address.fullName,
            address.company,
            address.streetLine1,
            address.streetLine2,
            address.province,
            address.postalCode,
            address.country.name,
        ].filter(notNullOrUndefined);
    }

    createAddress() {

    }

    editAddress(address: Address.Fragment) {
        // this.addressForm.addressForm.patchValue({ ...address, countryCode: address.country.code });
        this.step = 'editAddress';
    }

    setCustomerDetails() {
        // this.addressForm.addressForm.patchValue({
        //     fullName: `${this.firstName} ${this.lastName}`,
        // });
        this.step = 'editAddress';
    }

    setShippingAddress(value: AddressFormValue | Address.Fragment) {
        const input = this.valueToAddressInput(value);
        this.dataService.mutate<SetShippingAddress.Mutation, SetShippingAddress.Variables>(SET_SHIPPING_ADDRESS, {
            input,
        }).subscribe(data => {
            this.step = 'selectMethod';
            this.changeDetector.markForCheck();
        });
    }

    proceedToPayment() {
        const shippingMethodId = this.shippingMethodId;
        if (shippingMethodId) {
            this.stateService.select(state => state.signedIn).pipe(
                mergeMap(signedIn => !signedIn ? this.setCustomerForOrder() || of({}) : of({})),
                mergeMap(() =>
                    this.dataService.mutate<SetShippingMethod.Mutation, SetShippingMethod.Variables>(SET_SHIPPING_METHOD, {
                        id: shippingMethodId,
                    }),
                ),
                mergeMap(() => this.dataService.mutate<TransitionToArrangingPayment.Mutation>(TRANSITION_TO_ARRANGING_PAYMENT)),
            ).subscribe((data) => {
                this.router.navigate(['../payment'], { relativeTo: this.route });
            });
        }
    }

    private setCustomerForOrder() {
        if (this.addressForm.get('emailAddress')) {

            return this.dataService.mutate<SetCustomerForOrder.Mutation, SetCustomerForOrder.Variables>(SET_CUSTOMER_FOR_ORDER, {
                input: {
                    emailAddress: this.addressForm.get('emailAddress')?.value,
                    firstName: this.addressForm.get('firstName')?.value,
                    lastName: this.addressForm.get('lastName')?.value,
                },
            });
        }
    }

    private valueToAddressInput(value: AddressFormValue | Address.Fragment): CreateAddressInput {
        return {
            city: value.city || '',
            company: value.company || '',
            countryCode: this.isFormValue(value) ? value.countryCode : value.country.code,
            defaultBillingAddress: value.defaultBillingAddress,
            defaultShippingAddress: value.defaultShippingAddress,
            fullName: value.fullName || '',
            phoneNumber: value.phoneNumber || '',
            postalCode: value.postalCode || '',
            province: value.province || '',
            streetLine1: value.streetLine1 || '',
            streetLine2: value.streetLine2 || '',
        };
    }

    private isFormValue(input: AddressFormValue | Address.Fragment): input is AddressFormValue {
        return typeof (input as any).countryCode === 'string';
    }

    collapseMenu() {
        this.collapsedMenu = !this.collapsedMenu;
    }

    viewTolltip() {
        this.displayTooltip = !this.displayTooltip;
    }

    handleChange(event: any, id: number) {
        var target = event.target;
        this.openedItem = 0;
        
        if (target.checked) {
            this.openedItem = id;
        }
    }

    openModalAggrement() {
        this.modalService.fromComponent(TermsConditionsModalComponent, {
            closable: true,
        }).pipe(
      
        ).subscribe();
    }
}
