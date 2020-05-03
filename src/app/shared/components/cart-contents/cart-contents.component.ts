import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { 
        GetOrderForCheckout, 
        GetNextOrderStates, 
        TransitionToAddingItems, 
        RemoveItemFromCart, 
        AdjustItemQuantity,
        Cart,
        GetActiveOrder
    } from '../../../common/generated-types';

import { DataService } from '../../../core/providers/data/data.service';
import { ADJUST_ITEM_QUANTITY, REMOVE_ITEM_FROM_CART } from './cart-contents.graphql';


import { GetOrderList, SortOrder } from '../../../common/generated-types';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'bv-cart-contents',
    templateUrl: './cart-contents.component.html',
    styleUrls: ['./cart-contents.component.scss']
})
export class CartContentsComponent implements OnInit {
    // @Input() cart: GetActiveOrder.ActiveOrder;
    @Input() canAdjustQuantities = false;

    cart:any | Observable<any> = null;
    orders$: Observable<GetOrderList.Items[] | null>;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private translate: TranslateService
    ) {

    }

    trackByFn(index: number, line: { id: string; }) {
        return line.id;
    }

    ngOnInit(): void {        
        this.route.data.pipe(switchMap(data => data.activeOrder))
        .subscribe((response:any) => {
            this.cart = response;
        })

        this.route.data
        .subscribe((response) => {
            if(response.activeOrder) {
                response.activeOrder.subscribe((data: any) => {

                    this.cart = data;
                })
            }
        })
    }

    setQuantity(item: Cart.Lines) {
        if (0 < item.quantity) {
            this.adjustItemQuantity(item.id, item.quantity);
        } else {
            this.removeItem(item.id);
        }
    }
    
    private adjustItemQuantity(id: string, qty: number) {
      this.dataService.mutate<AdjustItemQuantity.Mutation, AdjustItemQuantity.Variables>(ADJUST_ITEM_QUANTITY, {
          id,
          qty,
      }).pipe(
          take(1),
      ).subscribe();
    }
    
    private removeItem(id: string) {
      this.dataService.mutate<RemoveItemFromCart.Mutation, RemoveItemFromCart.Variables>(REMOVE_ITEM_FROM_CART, {
          id,
      }).pipe(
          take(1),
      ).subscribe();
    }
    
    private removeLine(line: Cart.Lines) {
        this.dataService.mutate<RemoveItemFromCart.Mutation, RemoveItemFromCart.Variables>(REMOVE_ITEM_FROM_CART, {
          id: line.id
        }).pipe(
            take(1),
        ).subscribe();
    }
}
