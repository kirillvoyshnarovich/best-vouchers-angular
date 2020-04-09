import { Routes } from '@angular/router';

import { CheckoutConfirmationComponent } from './components/checkout-confirmation/checkout-confirmation.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { CheckoutProcessComponent } from './components/checkout-process/checkout-process.component';
import { CheckoutShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { CheckoutResolver } from './providers/checkout-resolver';
import { CheckoutGuard } from './providers/checkout.guard';
import { CartContentsComponent} from '../shared/components/cart-contents/cart-contents.component'
export const routes: Routes = [
    {
        path: '',
        component: CheckoutProcessComponent,
        resolve: {
            activeOrder: CheckoutResolver,
        },
        children: [
            {
                path: 'cart',
                component: CartContentsComponent,
                canActivate: [CheckoutGuard],
                resolve: {
                    activeOrder: CheckoutResolver,
                },
            },
            {
                path: 'shipping',
                component: CheckoutShippingComponent,
                canActivate: [CheckoutGuard],
                resolve: {
                    activeOrder: CheckoutResolver,
                }, 
            },
            {
                path: 'payment',
                component: CheckoutShippingComponent,
                canActivate: [CheckoutGuard],
                resolve: {
                    activeOrder: CheckoutResolver,
                },
            },
            // {
            //     path: 'confirmation/:code',
            //     component: CheckoutConfirmationComponent,
            //     canActivate: [CheckoutGuard],
            // },
            {
                path: '',
                redirectTo: 'cart'
            },
        ],
    },
];
