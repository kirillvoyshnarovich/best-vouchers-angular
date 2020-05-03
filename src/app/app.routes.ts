import { Route } from '@angular/router';

import { ProductDetailComponent } from './core/components/product-detail/product-detail.component';
import { ProductListComponent } from './core/components/product-list/product-list.component';
import { QuickLinksComponent } from './core/components/quick-links/quick-links.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';

export const routes: Route[] = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full',
    },
    {
        path: ':lang',
        component: HomePageComponent,
    },
    {
        path: ':lang/category/:collectionId',
        component: ProductListComponent,
    },
    {
        path: ':lang/search',
        component: ProductListComponent,
    },
    {
        path: ':lang/product/:id',
        component: ProductDetailComponent,
    },
    {
        path: ':lang/terms-and-services',
        component: QuickLinksComponent,
    },
    {
        path: ':lang/check-your-order',
        component: QuickLinksComponent,
    },
    {
        path: ':lang/privacy-policy',
        component: QuickLinksComponent,
    },
    {
        path: ':lang/return-policy',
        component: QuickLinksComponent,
    },
    {
        path: ':lang/delivery',
        component: QuickLinksComponent,
    },
    {
        path: ':lang/contact',
        component: QuickLinksComponent,
    },
    {
        path: ':lang/checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    },
];
