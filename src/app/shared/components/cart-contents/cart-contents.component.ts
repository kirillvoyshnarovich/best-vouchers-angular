import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Cart, GetActiveOrder } from '../../../common/generated-types';

@Component({
    selector: 'vsf-cart-contents',
    templateUrl: './cart-contents.component.html',
    styleUrls: ['./cart-contents.component.scss']
})
export class CartContentsComponent implements OnInit {
    @Input() cart: GetActiveOrder.ActiveOrder;
    @Input() canAdjustQuantities = false;
    @Output() setQuantity = new EventEmitter<{ itemId: string; quantity: number; }>();

    increment(item: Cart.Lines) {
        this.setQuantity.emit({ itemId: item.id, quantity: item.quantity + 1 });
    }

    decrement(item: Cart.Lines) {
        this.setQuantity.emit({ itemId: item.id, quantity: item.quantity - 1 });
    }

    trackByFn(index: number, line: { id: string; }) {
        return line.id;
    }

    ngOnInit(): void {

    }

    changeQuatity(item: Cart.Lines): void {
        console.log('changeQuatity', item);
        this.setQuantity.emit({ itemId: item.id, quantity: item.quantity });
    }

    /**
     * Filters out the Promotion adjustments for an OrderLine and aggregates the discount.
     */
    getLinePromotions(adjustments: Cart.Adjustments[]) {
        const groupedPromotions = adjustments.filter(a => a.type === 'PROMOTION')
            .reduce((groups, promotion) => {
                if (!groups[promotion.description]) {
                    groups[promotion.description] = promotion.amount;
                } else {
                    groups[promotion.description] += promotion.amount;
                }
                return groups;
            }, {} as { [description: string]: number; });
        return Object.entries(groupedPromotions).map(([key, value]) => ({ description: key, amount: value }));
    }
}
