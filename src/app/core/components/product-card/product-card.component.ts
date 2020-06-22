import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SearchProducts } from '../../../common/generated-types';

@Component({
    selector: 'bv-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

    @Input('mode') mode: any;

    @Input() product: SearchProducts.Items;

    constructor(private translate: TranslateService) {}


    ngOnInit():void {
    }
}
