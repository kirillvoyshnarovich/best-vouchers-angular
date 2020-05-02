import { Route } from '@angular/router';

import { ProductDetailComponent } from './core/components/product-detail/product-detail.component';
import { ProductListComponent } from './core/components/product-list/product-list.component';
import { QuickLinksComponent } from './core/components/quick-links/quick-links.component';
export const routes: Route[] = [
    {
        path: 'category/:collectionId',
        component: ProductListComponent,
        pathMatch: 'full',
    },
    {
        path: 'search',
        component: ProductListComponent,
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
    },
    {
        path: 'terms-and-services',
        component: QuickLinksComponent,
        pathMatch: 'full'
    },
    {
        path: 'check-your-order',
        component: QuickLinksComponent,
    },
    {
        path: 'privacy-policy',
        component: QuickLinksComponent,
    },
    {
        path: 'return-policy',
        component: QuickLinksComponent,
    },
    {
        path: 'delivery',
        component: QuickLinksComponent,
    },
    {
        path: 'contact',
        component: QuickLinksComponent,
    },
    {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    },
];
