import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

import { GetOrderForCheckout, GetNextOrderStates, TransitionToAddingItems } from '../../../common/generated-types';
import { DataService } from '../../../core/providers/data/data.service';
import { StateService } from '../../../core/providers/state/state.service';

import { TRANSITION_TO_ADDING_ITEMS } from './checkout-process.graphql';
import { Location } from '@angular/common';


@Component({
    selector: 'bv-checkout-process',
    templateUrl: './checkout-process.component.html',
    styleUrls: ['./checkout-process.component.scss']
})
export class CheckoutProcessComponent implements OnInit {

    isCartPage: boolean = false;
    cart$: Observable<GetOrderForCheckout.ActiveOrder | null | undefined>;
    nextStates$: Observable<string[]>;
    activeStage$: Observable<number>;
    signedIn$: Observable<boolean>;

    currentProcess: any = false;
    activeStage: number = 0;
    // data:any = null;

    constructor(
        private dataService: DataService,
                private stateService: StateService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location
                ) { }

    ngOnInit() {
        // for first init
        const url = this.location.path().split('/');
        this.currentProcess = url[url.length - 1];
        switch (this.currentProcess) {
            case 'shipping' : this.activeStage = 2, this.isCartPage = false;
                break;
            case 'payment' : this.activeStage = 3, this.isCartPage = false;
                break;
            default: this.activeStage = 0, this.isCartPage = true;
        }
        // for first init

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = this.router.url.split('/');
                this.currentProcess = url[url.length - 1];
                switch (this.currentProcess) {
                    case 'shipping' : this.activeStage = 2, this.isCartPage = false;
                        break;
                    case 'payment' : this.activeStage = 3, this.isCartPage = false;
                        break;
                    default: this.activeStage = 0, this.isCartPage = true;
                }
            }
        });

        // this.signedIn$ = this.stateService.select(state => state.signedIn);
        // this.cart$ = this.route.data.pipe(switchMap(data => data.activeOrder as Observable<GetOrderForCheckout.ActiveOrder>));

        // this.route.data.pipe(switchMap(data => data.activeOrder as Observable<GetOrderForCheckout.ActiveOrder>))
        // .subscribe((response) => {
        //     this.data = response;

        // })

        // this.route.data.pipe(switchMap(data => data.activeOrder))
        // .subscribe((response) => {

        // })

        // this.route.data
        // .subscribe((response) => {

        // })

        // this.nextStates$ = this.dataService.query<GetNextOrderStates.Query>(GET_NEXT_ORDER_STATES).pipe(
        //     map(data => data.nextOrderStates),
        // );
        // this.activeStage$ =  this.router.events.pipe(
        //     filter((event) => event instanceof NavigationEnd),
        //     startWith(true),
        //     map(() => {
        //         const firstChild = this.route.snapshot.firstChild;
        //         if (firstChild && firstChild.routeConfig) {
        //             switch (firstChild.routeConfig.path) {
        //                 case '':
        //                     return 1;
        //                 case 'shipping':
        //                     return 2;
        //                 case 'payment':
        //                     return 3;
        //                 case 'confirmation/:code':
        //                     return 4;
        //             }
        //         }
        //         return 1;
        //     }),
        // );
    }

}
