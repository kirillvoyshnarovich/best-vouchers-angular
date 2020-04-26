import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { DataService } from '../../../core/providers/data/data.service';

import { 
  AdjustItemQuantity, 
  RemoveItemFromCart,
  Cart, 
  GetOrderForCheckout,
  SlugProduct
} from '../../../common/generated-types';

import { ADJUST_ITEM_QUANTITY, REMOVE_ITEM_FROM_CART, GET_SLAG_PRODUCT } from './mini-cart.graphql';
import { GET_ORDER_FOR_CHECKOUT } from '../../../checkout/providers/checkout-resolver.graphql';

import { NotificationService } from '../../../core/providers/notification/notification.service';
import { ModalService } from '../../../core/providers/modal/modal.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'bv-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService,
    private injector: Injector,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.dataService.query<GetOrderForCheckout.Query>(GET_ORDER_FOR_CHECKOUT).pipe(
      map(data => data.activeOrder),
    ).subscribe((response) => {
      this.order = response;
    })

    this.dataService.query<SlugProduct.Query, SlugProduct.Variables>(GET_SLAG_PRODUCT, {
      id: '46'
    }).pipe(
      map(data => data)
    ).subscribe((response) => {

    });
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
    this.modalService.fromComponent(ConfirmModalComponent, {
      closable: true
    }).subscribe((result) => {
      if(result) {
        this.dataService.mutate<RemoveItemFromCart.Mutation, RemoveItemFromCart.Variables>(REMOVE_ITEM_FROM_CART, {
          id: line.id
        }).pipe(
            take(1),
        ).subscribe();
      }
    });
  }
}
