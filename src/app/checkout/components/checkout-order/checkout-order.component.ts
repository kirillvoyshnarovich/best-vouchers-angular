import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bv-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss'],
})
export class CheckoutOrderComponent implements OnInit {
    order:any = null;
    collapsedMenu = false;

    constructor(
        private route: ActivatedRoute,
    ) { 
        this.route.data
        .subscribe((response) => {
            if(response.activeOrder) {
                response.activeOrder.subscribe((data: any) => {
                    this.order = data;
                })
            }
        })
    }

    ngOnInit() {
    }

    collapse() {
        this.collapsedMenu = !this.collapsedMenu;
    }
}
