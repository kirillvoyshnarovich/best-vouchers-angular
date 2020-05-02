import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { routes } from './checkout.routes';
import { CheckoutConfirmationComponent } from './components/checkout-confirmation/checkout-confirmation.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { CheckoutProcessComponent } from './components/checkout-process/checkout-process.component';
import { CheckoutShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { CheckoutStageIndicatorComponent } from './components/checkout-stage-indicator/checkout-stage-indicator.component';
import { CheckoutOrderComponent } from './components/checkout-order/checkout-order.component';
import { TranslateModule } from '@ngx-translate/core';

const DECLARATIONS = [
    CheckoutConfirmationComponent,
    CheckoutPaymentComponent,
    CheckoutShippingComponent,
    CheckoutProcessComponent,
    CheckoutStageIndicatorComponent,
    CheckoutOrderComponent
];

@NgModule({
    declarations: DECLARATIONS,
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
})
export class CheckoutModule {
}
