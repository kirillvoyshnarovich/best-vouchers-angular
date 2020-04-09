import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { GetOrderForCheckout, GetNextOrderStates, TransitionToAddingItems } from '../../../common/generated-types';
import { DataService } from '../../../core/providers/data/data.service';
import { GET_ORDER_FOR_CHECKOUT } from '../../../checkout/providers/checkout-resolver.graphql';
import { Cart } from '../../../common/generated-types';
import { GetActiveOrder, AdjustItemQuantity, RemoveItemFromCart } from '../../../common/generated-types';
import { ADJUST_ITEM_QUANTITY, GET_ACTIVE_ORDER, REMOVE_ITEM_FROM_CART } from './cart-drawer.graphql';
import { NotificationService } from '../../../core/providers/notification/notification.service';
import { Injectable, Injector } from '@angular/core';
import { ModalService } from '../../../core/providers/modal/modal.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'vsf-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  data: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private notificationService: NotificationService,
    private injector: Injector,
    private modalService: ModalService
  ) { }


  
  // increment(item: Cart.Lines) {
  //   this.setQuantity.emit({ itemId: item.id, quantity: item.quantity + 1 });
  // }

  // decrement(item: Cart.Lines) {
  //   this.setQuantity.emit({ itemId: item.id, quantity: item.quantity - 1 });
  // }


  ngOnInit(): void {

    this.dataService.query<GetOrderForCheckout.Query>(GET_ORDER_FOR_CHECKOUT).pipe(
      map(data => data.activeOrder),
    ).subscribe((response) => {
      this.data = response;
    })

    // this.route.data.pipe(switchMap(data => data.activeOrder as Observable<GetOrderForCheckout.ActiveOrder>))
    // .subscribe((response) => {
    //     this.data = response;
    // })
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

  removeItemCart() {
    this.modalService.fromComponent(ConfirmModalComponent, {
      closable: true,
    }).pipe(

    ).subscribe();
  }

  private displayErrorNotification(message: string): void {
    const notificationService = this.injector.get<NotificationService>(NotificationService);
    notificationService.error(message).subscribe();
  }
}
