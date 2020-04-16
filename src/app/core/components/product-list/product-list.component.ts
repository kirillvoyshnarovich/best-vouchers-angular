import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { GetCollection, SearchProducts } from '../../../common/generated-types';
import { getRouteArrayParam } from '../../../common/utils/get-route-array-param';
import { DataService } from '../../providers/data/data.service';
import { StateService } from '../../providers/state/state.service';
import { GET_COLLECTION, SEARCH_PRODUCTS } from './product-list.graphql';

@Component({
    selector: 'vsf-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    breadcrumbs: GetCollection.Breadcrumbs[] = [];

    // for pagination
    pageList: number[] = [];
    startSlice: number = 0;
    endSlice: number = 4;
    // for pagination

    amoutPage: number = 0;
    countItems: number = 0;
    perPage: number = 12;
    request: boolean = false;
    collectionId:any = null;
    products:any = [];
    currentPage = 1;
    load: boolean = true;

    rowModeView = false;

    constructor(private dataService: DataService,
                private route: ActivatedRoute,
                private stateService: StateService,
                private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            map(pm => pm.get('collectionId')),
            distinctUntilChanged(),
            map(id => {
                if (id) {
                    const parts = id.split('_');
                    return parts[parts.length - 1];
                }
            })
        ).subscribe((collectionId) => {
            this.collectionId = collectionId;
            this.stateService.setState('lastCollectionId', collectionId || null);
            this.getItems();
            this.getBreadCrumbs();
        });
    }

    getItems(): void {
        this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
            input: {
                term: '',
                groupByProduct: true,
                collectionId: this.collectionId,
                facetValueIds: [],
                take: this.perPage,
                skip: this.perPage * (this.currentPage - 1),
            },
        }).subscribe((response) => {
            this.products = response['search'].items;
            this.countItems = response['search'].totalItems;
            this.load = false;
            if(!this.request) {
                this.generateListPage();
                this.request = true;
            }
        });
    }

    getBreadCrumbs(): void {
        this.dataService.query<GetCollection.Query, GetCollection.Variables>(GET_COLLECTION, {
            id: this.collectionId,
        }).subscribe((response) => {
            if(response['collection']) {
                this.breadcrumbs = response['collection'].breadcrumbs;
            }
        })
    }

    choosePage(page: number): void {
        if(page <= this.amoutPage && page > 0) {
            this.load = true;
            this.currentPage = +page;
            this.getItems();
        }
    }

    generateListPage() {
        this.amoutPage = Math.ceil(this.countItems/this.perPage);
        for(let i = 0; i < this.amoutPage; i++) {
            this.pageList.push(i+1);
        }
    }

    changeModeView(rowMode: boolean) {
        this.rowModeView = rowMode;
    }
}
