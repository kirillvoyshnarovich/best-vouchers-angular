import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { distinctUntilChanged } from 'rxjs/operators';

import { DataService } from '../../providers/data/data.service';

import { SearchProducts } from '../../../common/generated-types';
import { SEARCH_PRODUCTS } from '../product-list/product-list.graphql';

export const slideInAnimation =
  trigger('apperCategory', [
    state('hidden', style({
        opacity: 0,
    })),
    state('appear', style({
        opacity: 1,
    })),
    transition('hidden => appear', [
        animate('1s'),
    ]),
  ]);

@Component({
    selector: 'bv-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [slideInAnimation],
})
export class HomePageComponent implements OnInit {

    @HostListener('window:resize', ['$event.target']) onResize(target: any) {
        this.calculateSizes();
    }

    constructor(
        private dataService: DataService,
        private sanitizer: DomSanitizer,
        public translate: TranslateService,
        private route: ActivatedRoute) { }

    collapsedMenuCategory = false;

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

    listLocationDefault = [
        'sideBar_first',
        'sideBar_second',
        'top_first',
        'top_second',
        'bottom_firstRow_first',
        'bottom_firstRow_second',
        'bottom_secondRow',
      ];

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
                        this.banners.push({
                            url: `url(${banner.source})`,
                            buttonText: banner.buttonText,
                            category: banner.category,
                            description: banner.description,
                            headerBanner: banner.headerBanner,
                        });
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
            this.offsetMainSlider = 'translate(-' + this.stepInPercent * (this.stepTranslateMainSlider) + '%)';
        } else if (!next && this.stepTranslateMainSlider <= this.amountSlideInRow &&
            this.stepTranslateMainSlider > 0) {

            this.stepTranslateMainSlider -= 1;
            this.offsetMainSlider = 'translate(-' + this.stepInPercent * (this.stepTranslateMainSlider) + '%)';
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
