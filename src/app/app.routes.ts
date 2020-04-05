import { Route } from '@angular/router';

import { ProductDetailComponent } from './core/components/product-detail/product-detail.component';
import { ProductListComponent } from './core/components/product-list/product-list.component';

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
        loadChildren: () => import('./core/components/quick-links/quick-links.module').then(m => m.QuickLinksModule),
    },
    {
        path: 'check-your-order',
        loadChildren: () => import('./core/components/quick-links/quick-links.module').then(m => m.QuickLinksModule),
    },
    {
        path: 'privacy-policy',
        loadChildren: () => import('./core/components/quick-links/quick-links.module').then(m => m.QuickLinksModule),
    },
    {
        path: 'return-policy',
        loadChildren: () => import('./core/components/quick-links/quick-links.module').then(m => m.QuickLinksModule),
    },
    {
        path: 'delivery',
        loadChildren: () => import('./core/components/quick-links/quick-links.module').then(m => m.QuickLinksModule),
    },
    {
        path: 'contact',
        loadChildren: () => import('./core/components/quick-links/quick-links.module').then(m => m.QuickLinksModule),
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    },
    {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    },
];
