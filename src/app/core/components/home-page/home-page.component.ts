import { animate, trigger, transition, style, state } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { DataService } from '../../providers/data/data.service';

import { SearchProducts } from '../../../common/generated-types';
import { SEARCH_PRODUCTS } from '../product-list/product-list.graphql';


import { TranslateService } from '@ngx-translate/core';

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
    selector: 'bv-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [slideInAnimation]
})
export class HomePageComponent implements OnInit {

    @HostListener('window:resize', ['$event.target']) onResize(target: any) {
        this.calculateSizes();
    }

    heroImage: SafeStyle;

    constructor(
        private dataService: DataService,
        private sanitizer: DomSanitizer,
        private translate: TranslateService,
        private route: ActivatedRoute) { }

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
    ];

    indexStart = 0;
    indexEnd = 5;

    categoryList: any[] = [];
    currentActiveMenu = null;
    initIdCategory: any;
    listVendersInitialCategory: any = [];
    currentPage = 0;

    offsetMainSlider = 'translateX(0%)';
    stepTranslateMainSlider: any = 0;
    amountSlideInRow = 0;

    hiddenItems = true;
    currentWidthWindow = 0;
    stepInPercent = 0;
    countSlideView = 0;
    thisPage: any = [];
    advertising: any = [];
    banners: any = [];
    existBanners: any = false;
    existAdvertising: any = false;

    // 'sideBar_first',
    // 'sideBar_second',
    // 'top_first',
    // 'top_second',
    // 'bottom_firstRow_first',
    // 'bottom_firstRow_second',
    // 'bottom_secondRow'

    ngOnInit() {
        this.calculateSizes();

        this.dataService.query(GET_COLLECTIONS, {
            options: {},
        }).subscribe((response) => {
            this.categoryList = response['collections'].items;
            this.initIdCategory = this.categoryList[0] ? this.categoryList[0].id : null;
        });

        this.route.data
        .subscribe((response) => {
          if (response.page) {
            response.page.
            pipe(
              distinctUntilChanged(),
            ).subscribe((r: any) => {
                this.advertising = [];
                this.banners = [];
                this.thisPage = r;
                console.log('thisPage', this.thisPage);
                if (r.advertising[0]) {
                    this.thisPage.advertising.forEach((item: any) => {
                    item.source = item.source.replace(/\\/g, '/'); // fix later !!!!!!
                    this.advertising[item.location] = {
                        source: item.source,
                        link: item.link,
                        category: item.category,
                        product: (item.product) ? item.product : null,
                    };
                    });
                    this.existAdvertising = true;
                } else {
                    this.existAdvertising = false;
                }
                if (r.banner[0]) {
                    this.thisPage.banner.forEach((banner: any) => {
                        banner.source = banner.source.replace(/\\/g, '/'); // fix later !!!!!!
                        this.banners.push(`url(${banner.source})`);
                    });
                    this.existBanners = true;
                } else {
                    this.existBanners = false;
                }
            });
          }
        });

        this.getCategory(this.initIdCategory);
    }

    chnageCollapsed(): void {
        this.collapsedMenuCategory = !this.collapsedMenuCategory;
    }

    changeActiveMenu(category: any): void {
        this.initIdCategory = category.id;
        this.offsetMainSlider = 'translateX(0%)';
        this.hiddenItems = true;
        this.getCategory(this.initIdCategory);
    }

    toggleMainSliderNext(next: any): void {
        if (next && this.stepTranslateMainSlider < this.amountSlideInRow) {
            this.stepTranslateMainSlider += 1;
            this.offsetMainSlider = 'translate(-' + this.stepInPercent * (this.stepTranslateMainSlider)+'%)';
        } else if (!next && this.stepTranslateMainSlider <= this.amountSlideInRow &&
            this.stepTranslateMainSlider > 0) {

            this.stepTranslateMainSlider -= 1;
            this.offsetMainSlider = 'translate(-'+ this.stepInPercent*(this.stepTranslateMainSlider)+'%)';
        }
    }
    // for slider in below

    getCategory(id: any): void {
        const perPage = 24;
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
            console.log(response['search'].items)
            this.listVendersInitialCategory = response['search'].items;
            this.amountSlideInRow = Math.ceil(this.listVendersInitialCategory.length / 2) - 3;
            // later check !!!
            setTimeout(() => {
                this.hiddenItems = false;
            });
        });
    }

    getStateAnimation(state: string): any {
        return state;
    }

    // utility
    calculateSizes(): void {
        this.currentWidthWindow = window.innerWidth;
        if (this.currentWidthWindow > 767) {
          this.stepInPercent = 33.3;
          this.countSlideView = 5;
        } else if (this.currentWidthWindow <= 767) {
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
