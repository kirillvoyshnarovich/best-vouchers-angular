import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { GetCollection } from '../../../common/generated-types';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'bv-collection-breadcrumbs',
    templateUrl: './collection-breadcrumbs.component.html',
    styleUrls: ['./collection-breadcrumbs.component.scss'],
})
export class CollectionBreadcrumbsComponent implements OnChanges {

    @Input() breadcrumbs: GetCollection.Breadcrumbs[] = [];
    @Input() linkLast = false;

    constructor(private translate: TranslateService) {}

    tail<T>(arr: T[] | null): T[] {
        return arr ? arr.slice(1) : [];
    }

    ngOnChanges(changes: SimpleChanges) {

    }
}
