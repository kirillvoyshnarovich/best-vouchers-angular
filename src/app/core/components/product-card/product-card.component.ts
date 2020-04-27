import { Component, Input } from '@angular/core';

import { SearchProducts } from '../../../common/generated-types';

@Component({
    selector: 'bv-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

    @Input('mode') mode: any;

    @Input() product: SearchProducts.Items;


    ngOnInit():void {
    }
}
