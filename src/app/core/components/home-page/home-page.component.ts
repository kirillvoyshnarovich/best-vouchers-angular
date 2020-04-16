import { ChangeDetectionStrategy, Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { DataService } from '../../providers/data/data.service';
import { GetCollection, SearchProducts } from '../../../common/generated-types';
import { GET_COLLECTION, SEARCH_PRODUCTS } from '../product-list/product-list.graphql';
import { trigger, transition, animate, style, state } from '@angular/animations';

export const slideInAnimation =
  trigger('apperCategory', [
    state('hidden', style({
        opacity: 0,
    })),
    state('appear', style({
        opacity: 1,
    })),
    transition('hidden => appear', [
        animate('1s')
    ]),
  ]);

@Component({
    selector: 'vsf-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [slideInAnimation]
})
export class HomePageComponent implements OnInit {

    @HostListener('window:resize', ['$event.target']) onResize(target: any) {
        this.calculateSizes();
        //this.offsetDomElement = 'translateX(0%)';
    }

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

    categoryList: any[] = [];
    currentActiveMenu = null;
    initIdCategory: any = 6;
    listVendersInitialCategory:any = [];
    currentPage = 0;

    offsetMainSlider = 'translateX(0%)';
    stepTranslateMainSlider: any = 0;
    amountSlideInRow = 0;

    hiddenItems = true;
    currentWidthWindow = 0;
    stepInPercent = 0;
    countSlideView = 0;
    // offsetBestSellerSlider = 'translateX(0%)';
    // stepTranslateBestSellerSlider: any = 0;
    // amountBestSellerSlider = 0;
    ngOnInit() {
        this.heroImage = this.sanitizer.bypassSecurityTrustStyle(this.getHeroImageUrl());
        // this.collections$ = this.dataService.query(GET_COLLECTIONS, {
        //     options: {},
        // }).pipe(
        //     map(data => data.collections.items
        //         .filter((collection: any) => collection.parent && collection.parent.name === '__root_collection__'),
        //     ),
        // );

        this.calculateSizes()

        this.dataService.query(GET_COLLECTIONS, {
            options: {},
        }).subscribe((response) => {
            this.categoryList = response['collections'].items;
        })
        // .pipe(
        //     map(data => data.collections.items
        //         .filter((collection: any) => collection.parent && collection.parent.name === '__root_collection__'),
        //     ),
        // );

        // this.topSellers$ = 

        this.getCategory(this.initIdCategory);

        // this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
        //     input: {
        //         term: '',
        //         groupByProduct: true,
        //         collectionId: this.initIdCategory,
        //         facetValueIds: [],
        //         take: perPage,
        //         skip: this.currentPage * perPage,
        //     },
        // }).subscribe((response) => {
        //     this.listVendersInitialCategory = response['search'].items;
        //     this.amountSlideInRow = Math.ceil(this.listVendersInitialCategory.length/2) - 3;
        // });
        // .pipe(
        //     map(data => data.search.items),
        //     shareReplay(1),
        // );

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
        this.initIdCategory= category.id;
        this.offsetMainSlider = 'translateX(0%)';
        this.hiddenItems = true;
        this.getCategory(this.initIdCategory);
    }

    toggleMainSliderNext(next: any): void {
        if(next && this.stepTranslateMainSlider < this.amountSlideInRow) {
            this.stepTranslateMainSlider += 1;
            this.offsetMainSlider = 'translate(-'+ this.stepInPercent*(this.stepTranslateMainSlider)+'%)';
        } else if(!next && this.stepTranslateMainSlider <= this.amountSlideInRow && 
            this.stepTranslateMainSlider > 0) {

            this.stepTranslateMainSlider -= 1;
            this.offsetMainSlider = 'translate(-'+ this.stepInPercent*(this.stepTranslateMainSlider)+'%)';
        }
    }
    // for slider in below


    getCategory(id: any): void {
        let perPage = 24;
        this.dataService.query<SearchProducts.Query, SearchProducts.Variables>(SEARCH_PRODUCTS, {
            input: {
                term: '',
                groupByProduct: true,
                collectionId: id,
                facetValueIds: [],
                take: perPage,
                skip: this.currentPage * perPage,
            },
        }).subscribe((response) => {
            this.listVendersInitialCategory = response['search'].items;
            this.amountSlideInRow = Math.ceil(this.listVendersInitialCategory.length/2) - 3;

            // later check !!!
            setTimeout(() => {
                this.hiddenItems = false;
            })
        });
    }

    getStateAnimation(state: string): any {
        return state;
    }

    // utility
    calculateSizes(): void {
        this.currentWidthWindow = window.innerWidth;
    
        if(this.currentWidthWindow > 767) {
          this.stepInPercent = 33.3;
          this.countSlideView = 5;
        } else if(this.currentWidthWindow <= 767) {
          this.stepInPercent = 50;
          this.countSlideView = 4;
        }
    }
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

