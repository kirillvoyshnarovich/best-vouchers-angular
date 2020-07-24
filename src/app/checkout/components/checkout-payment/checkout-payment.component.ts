import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransitionToArrangingPayment } from '../../../common/generated-types';
import { AddPayment } from '../../../common/generated-types';
import { DataService } from '../../../core/providers/data/data.service';
import { StateService } from '../../../core/providers/state/state.service';
import { TermsConditionsModalComponent } from '../../../shared/components/terms-conditions-modal/terms-conditions-modal.component';
import { ModalService } from '../../../core/providers/modal/modal.service';
import { ADD_PAYMENT } from './checkout-payment.graphql';

import {
    TRANSITION_TO_ADD_ITEM
} from '../checkout-shipping/checkout-shipping.graphql';

@Component({
    selector: 'bv-checkout-payment',
    templateUrl: './checkout-payment.component.html',
    styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {
    cardNumber: string;
    expMonth: number;
    expYear: number;
    openedItem = 0;
    constructor(private dataService: DataService,
                private modalService: ModalService,
                private stateService: StateService,
                private router: Router,
                private route: ActivatedRoute) { }

    getMonths(): number[] {
        return Array.from({ length: 12 }).map((_, i) => i + 1);
    }

    getYears(): number[] {
        const year = new Date().getFullYear();
        return Array.from({ length: 10 }).map((_, i) => year + i);
    }

    completeOrder() {
        this.dataService.mutate<AddPayment.Mutation, AddPayment.Variables>(ADD_PAYMENT, {
            input: {
                method: 'example-payment-provider',
                metadata: {
                    foo: 'bar',
                },
            },
        })
            .subscribe(async result => {
                const order = result.addPaymentToOrder;
                if (order && (order.state === 'PaymentSettled' || order.state === 'PaymentAuthorized')) {
                    await new Promise(resolve => setTimeout(() => {
                        this.stateService.setState('activeOrderId', null);
                        resolve();
                    }, 500));
                    this.router.navigate(['../confirmation', order.code], { relativeTo: this.route });
                }
            });
    }

    openModalAggrement() {
        this.modalService.fromComponent(TermsConditionsModalComponent, {
            closable: true,
        }).pipe(
      
        ).subscribe();
    }

    handleChange(event: any, id: number) {
        var target = event.target;
        this.openedItem = 0;
        
        if (target.checked) {
            this.openedItem = id;
        }
    }

    addItemStateMutation() {
        this.dataService.mutate<TransitionToArrangingPayment.Mutation>(TRANSITION_TO_ADD_ITEM)
        .subscribe((response) => {

        })
    }
}
