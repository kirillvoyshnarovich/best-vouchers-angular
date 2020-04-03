import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { DataService } from '../../providers/data/data.service';
import { GetCollection, SearchProducts } from '../../../common/generated-types';
import { GET_COLLECTION, SEARCH_PRODUCTS } from '../product-list/product-list.graphql';

@Component({
    selector: 'vsf-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {

    collections$: Observable<any[]>;
    topSellers$: Observable<any[]>;
    topSellersLoaded$: Observable<boolean>;
    heroImage: SafeStyle;
    readonly placeholderProducts = Array.from({ length: 12 }).map(() => null);
    constructor(private dataService: DataService, private sanitizer: DomSanitizer) { }


    collapsedMenuCategory = false;
    ourAdvantagesList = [
        {
            id: 1,
            title: 'FREE SHIPPING',
            description: `All the prices displayed on our site are the totals, 
            with no hidden payments like the shipment fee. We guarantee free 
            shipping every time you order something from our website!`,
            icon: 'trunk'
        },
        {
            id: 2,
            title: '14 DAYS MONEY BACK',
            description: `Your plans have changed? No worries! We guarantee 
            that the money will be back into your account within 14 days. A 100% guarantee!`,
            icon: 'history'
        },
        {
            id: 3,
            title: 'PAYMENT SECURED',
            description: `We make sure that payments on our site remain as safe as possible. 
            Our protocols are constantly updated and adjusted to guarantee maximum safety to 
            our clients!`,
            icon: 'lock'
        }
    ]

    indexStart = 0;
    indexEnd = 5;

    categoryList = [];
    currentActiveMenu = null;
    initIdCategory = '6';
    listVendersInitialCategory:any = [];
    currentPage = 0;

    offsetMainSlider = 'translateX(0%)';
    stepTranslateMainSlider: any = 0;
    amountSlideInRow = 0;

    offsetBestSellerSlider = 'translateX(0%)';
    stepTranslateBestSellerSlider: any = 0;
    amountBestSellerSlider = 0;
    ngOnInit() {
        this.heroImage = this.sanitizer.bypassSecurityTrustStyle(this.getHeroImageUrl());
        // this.collections$ = this.dataService.query(GET_COLLECTIONS, {
        //     options: {},
        // }).pipe(
        //     map(data => data.collections.items
        //         .filter((collection: any) => collection.parent && collection.parent.name === '__root_collection__'),
        //     ),
        // );

        this.dataService.query(GET_COLLECTIONS, {
            options: {},
        }).subscribe((response) => {
            console.log('categoryList', response);
            this.categoryList = response['collections'].items;
        })
        // .pipe(
        //     map(data => data.collections.items
        //         .filter((collection: any) => collection.parent && collection.parent.name === '__root_collection__'),
        //     ),
        // );

        // this.topSellers$ = 

        let perPage = 24;
        return this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
            input: {
                term: '',
                groupByProduct: true,
                collectionId: this.initIdCategory,
                facetValueIds: [],
                take: perPage,
                skip: this.currentPage * perPage,
            },
        }).subscribe((response) => {
            console.log('response !!!', response);
            this.listVendersInitialCategory = response['search'].items;
            this.amountSlideInRow = Math.ceil(this.listVendersInitialCategory.length/2) - 3;
            console.log('amountSlideInRow', this.amountSlideInRow);
        });
        // .pipe(
        //     map(data => data.search.items),
        //     shareReplay(1),
        // );

        // console.log('this.topSellers$', this.topSellers$);
        // this.topSellersLoaded$ = this.topSellers$.pipe(
        //     map(items => 0 < items.length),
        // );


    }

    private getHeroImageUrl(): string {
        const { apiHost, apiPort } = environment;
        // ${apiHost}:${apiPort}
        return `url('/assets/bestvouchers/wiosna_slider.jpg')`;
    }

    chnageCollapsed(): void {
        this.collapsedMenuCategory = !this.collapsedMenuCategory;
    }

    changeActiveMenu(category: any): void {
        console.log('changeActiveMenu', category);
        this.currentActiveMenu = category.id;
    }

    // for slider in below
    toggleBestSelerSlider(next: any): void {
        if(next && this.stepTranslateBestSellerSlider < this.amountBestSellerSlider) {
            this.stepTranslateBestSellerSlider += 1;
            this.offsetBestSellerSlider = 'translate(-'+ 20*(this.stepTranslateBestSellerSlider)+'%)';
        } else if(!next && this.stepTranslateBestSellerSlider <= this.amountBestSellerSlider && 
            this.stepTranslateBestSellerSlider > 0) {

            this.stepTranslateBestSellerSlider -= 1;
            this.offsetBestSellerSlider = 'translate(-'+ 20*(this.stepTranslateBestSellerSlider)+'%)';
        }
    }
    toggleMainSliderNext(next: any): void {
        if(next && this.stepTranslateMainSlider < this.amountSlideInRow) {
            this.stepTranslateMainSlider += 1;
            this.offsetMainSlider = 'translate(-'+ 33.3*(this.stepTranslateMainSlider)+'%)';
        } else if(!next && this.stepTranslateMainSlider <= this.amountSlideInRow && 
            this.stepTranslateMainSlider > 0) {

            this.stepTranslateMainSlider -= 1;
            this.offsetMainSlider = 'translate(-'+ 33.3*(this.stepTranslateMainSlider)+'%)';
        }
    }
    // for slider in below
}

const GET_COLLECTIONS = gql`
    query GetCollections($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                parent {
                    id
                    name
                }
                featuredAsset {
                    id
                    preview
                }
            }
        }
    }
`;

