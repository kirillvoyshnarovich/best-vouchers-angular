import { Route } from '@angular/router';

import { PageResolver } from './app-resolver';
import { ProductDetailComponent } from './core/components/product-detail/product-detail.component';
import { ProductListComponent } from './core/components/product-list/product-list.component';
import { QuickLinksComponent } from './core/components/quick-links/quick-links.component';

import { HomePageComponent } from './core/components/home-page/home-page.component';

export const routes: Route[] = [
    {
        path: 'home',
        component: HomePageComponent,
        pathMatch: 'full',
        resolve: {
            page: PageResolver,
        },
    },
    {
        path: ':lang/home',
        component: HomePageComponent,
        resolve: {
            page: PageResolver,
        },
    },
    {
        path: ':lang/category/:collectionId',
        component: ProductListComponent,
        resolve: {
            page: PageResolver,
        },
    },
    {
        path: ':lang/search',
        component: ProductListComponent,
        resolve: {
            page: PageResolver,
        },
    },
    {
        path: ':lang/product/:id',
        component: ProductDetailComponent,
        resolve: {
            page: PageResolver,
        },
    },
    // {
    //     path: ':lang/terms-and-services',
    //     component: QuickLinksComponent,
    // },
    // {
    //     path: ':lang/check-your-order',
    //     component: QuickLinksComponent,
    // },
    // {
    //     path: ':lang/privacy-policy',
    //     component: QuickLinksComponent,
    // },
    // {
    //     path: ':lang/return-policy',
    //     component: QuickLinksComponent,
    // },
    // {
    //     path: ':lang/delivery',
    //     component: QuickLinksComponent,
    // },
    // {
    //     path: ':lang/contact',
    //     component: QuickLinksComponent,
    // },
    {
        path: ':lang/quik-link/:slug',
        component: QuickLinksComponent,
        resolve: {
            page: PageResolver,
        },
    },
    {
        path: ':lang/checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    },
    {
        path      : '',
        redirectTo: 'en/home',
        pathMatch: 'full',
    },
    // {
    //     path      : '**',
    //     redirectTo: ':lang/home',
    //     pathMatch: 'full',
    // },
];
