import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { 
    Address, 
    CreateAddressInput, 
    GetAvailableCountries,
    GetCustomerAddresses, 
    GetEligibleShippingMethods, 
    GetShippingAddress, 
    SetCustomerForOrder, 
    SetShippingAddress, 
    SetShippingMethod, 
    TransitionToArrangingPayment } from '../../../common/generated-types';

import { GET_AVAILABLE_COUNTRIES, GET_CUSTOMER_ADDRESSES } from '../../../common/graphql/documents.graphql';
import { DataService } from '../../../core/providers/data/data.service';
import { ModalService } from '../../../core/providers/modal/modal.service';
import { StateService } from '../../../core/providers/state/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    GET_ELIGIBLE_SHIPPING_METHODS,
    GET_SHIPPING_ADDRESS,
    SET_CUSTOMER_FOR_ORDER,
    SET_SHIPPING_ADDRESS,
    SET_SHIPPING_METHOD,
    TRANSITION_TO_ARRANGING_PAYMENT
} from './checkout-shipping.graphql';

import { TermsConditionsModalComponent } from '../../../shared/components/terms-conditions-modal/terms-conditions-modal.component';
export type AddressFormValue = Pick<Address.Fragment, Exclude<keyof Address.Fragment, 'country'>> & { countryCode: string; };

@Component({
    selector: 'bv-checkout-shipping',
    templateUrl: './checkout-shipping.component.html',
    styleUrls: ['./checkout-shipping.component.scss']
})
export class CheckoutShippingComponent implements OnInit {

    customerAddresses$: Observable<Address.Fragment[]>;
    availableCountries$: Observable<GetAvailableCountries.AvailableCountries[]>;
    eligibleShippingMethods$: Observable<GetEligibleShippingMethods.EligibleShippingMethods[]>;
    shippingAddress$: Observable<GetShippingAddress.ShippingAddress | null | undefined>;
    shippingMethodId: string | undefined;
    order:any = null;
    displayTooltip = false;
    availableCountries:any = [];
    addressForm: FormGroup;
    errors: any = {};

    constructor(
        private dataService: DataService,
        private stateService: StateService,
        private modalService: ModalService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ) { 

        this.route.data
        .subscribe((response) => {
            if(response.activeOrder) {
                response.activeOrder.subscribe((data: any) => {
                    this.order = data;
                })
            }
        })

        this.addressForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            emailAddress: ['', [Validators.required, Validators.email]],
            fullName: '',
            streetLine1: ['', Validators.required],
            streetLine2: '',
            city: ['', Validators.required],
            province: '',
            postalCode: ['', Validators.required],
            countryCode: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            company: '',
        });
    }

    ngOnInit() {
        this.dataService.query<GetAvailableCountries.Query>(GET_AVAILABLE_COUNTRIES)
        .subscribe((response) => {
            this.availableCountries = response.availableCountries;
        })

        this.customerAddresses$ = this.dataService.query<GetCustomerAddresses.Query>(GET_CUSTOMER_ADDRESSES).pipe(
            map(data => data.activeCustomer ? data.activeCustomer.addresses || [] : []),
        );

        this.shippingAddress$ = this.dataService.query<GetShippingAddress.Query>(GET_SHIPPING_ADDRESS).pipe(
            map(data => data.activeOrder && data.activeOrder.shippingAddress),
        );

        this.shippingAddress$.pipe(
            map((data) => this.addressForm.patchValue(data as any))
        )

        this.eligibleShippingMethods$ = this.shippingAddress$.pipe(
            switchMap(() => this.dataService.query<GetEligibleShippingMethods.Query>(GET_ELIGIBLE_SHIPPING_METHODS)),
            map(data => data.eligibleShippingMethods),
        );
    }

    setShippingAddress(value: AddressFormValue | Address.Fragment): Observable<any> {
        const input = this.valueToAddressInput(value);
        return this.dataService.mutate<SetShippingAddress.Mutation, SetShippingAddress.Variables>(SET_SHIPPING_ADDRESS, {
            input,
        })
    }

    proceedToPayment(value: AddressFormValue | Address.Fragment) {
        if(!this.addressForm.valid) {

            this.validateForm();
            return;
        } 
        const shippingMethodId = this.shippingMethodId;
        if (shippingMethodId) {
            this.stateService.select(state => state.signedIn).pipe(
                mergeMap(signedIn => !signedIn ? this.setCustomerForOrder() || of({}) : of({})),
                mergeMap(()=> this.setShippingAddress(this.addressForm.value)),
                mergeMap(() =>
                    this.dataService.mutate<SetShippingMethod.Mutation, SetShippingMethod.Variables>(SET_SHIPPING_METHOD, {
                        id: shippingMethodId
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
            })
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

    viewTolltip() {
        this.displayTooltip = !this.displayTooltip;
    }

    openModalAggrement() {
        this.modalService.fromComponent(TermsConditionsModalComponent, {
            closable: true,
        })
    }

    setShippingMethod(method: any) {
        this.dataService.mutate<SetShippingMethod.Mutation, SetShippingMethod.Variables>(SET_SHIPPING_METHOD, {
            id: method.id
        }).subscribe(() => {
            this.shippingMethodId = method.id;
        })
    }

    validateForm() {
        this.errors = {};
        const controls = this.addressForm.controls;
        for(const key in controls) {
            if(controls[key] && controls[key].errors) {
                this.errors[key] = controls[key].errors;
            }
        }
    }
}
