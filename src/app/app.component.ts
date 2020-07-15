import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, ActivationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StateService } from './core/providers/state/state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './core/providers/data/data.service';
import gql from 'graphql-tag';

@Component({
    selector: 'sf-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    cartDrawerVisible$: Observable<boolean>;
    mobileNavVisible$: Observable<boolean>;
    isHomePage$: Observable<boolean>;

    defaultListLang = [
        {
            name: 'English',
            code: 'en'
        },
        {
            name: 'Polski',
            code: 'pl'
        },
        {
            name: 'Ελληνικά',
            code: 'el'
        },
        {
            name: 'Český',
            code: 'cs'
        },
        {
            name: 'Português',
            code: 'pt'
        },
        {
            name: 'Magyar',
            code: 'hu'
        },
        {
            name: 'Français',
            code: 'fr'
        },
        {
            name: 'Български',
            code: 'bg'
        },
        {
            name: 'Hrvatski',
            code: 'hr'
        },
        {
            name: 'Italiano',
            code: 'it'
        },
        {
            name: 'Slovenský',
            code: 'sl'
        },
        {
            name: 'Slovenščina',
            code: 'sk'
        },
        {
            name: 'Eesti',
            code: 'et'
        },
        {
            name: 'Deutsch',
            code: 'nl'
        },
        {
            name: 'Lietuvių',
            code: 'lt'
        },
        {
            name: 'Español',
            code: 'es' 
        },
        {
            name: 'Latviešu',
            code: 'lv'
        },
        {
            name: 'Turkish',
            code: 'tr'
        },
        {
            name: 'Indonesia',
            code: 'id'
        },
        {
            name: 'Română',
            code: 'ro'
        },
    ];

    listlang = [
        {code: "en", name: "English", id: ''},
        {code: "pl", name: "Polish", id: ''},
    ];

    currentLang: any = null;
    listPages: any = [];
    showMiniCart = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private stateService: StateService,
                private http: HttpClient,
                public translate: TranslateService,
                private dataService: DataService
                ) {
        this.router.events.pipe(
                filter((event) => event instanceof ActivationEnd),
            ).subscribe((event: any) => {
               const lang = event.snapshot.params.lang ? event.snapshot.params.lang : 'en';
               this.stateService.setLanguage(lang);

                if((this.currentLang && this.currentLang.code !== lang) || this.stateService.getPages().length === 0) {
                    this.getPages(lang);
                }

               const lng = this.listlang.find(l => l.code === lang);
               this.chooseLang({code: lng?.code ? lng.code : 'en', name: lng?.name ? lng.name: 'English', id: ''});
            });

        this.getAvailableLanguages();
    }

    ngOnInit(): void {
        this.cartDrawerVisible$ = this.stateService.select(state => state.cartDrawerOpen);
        this.mobileNavVisible$ = this.stateService.select(state => state.mobileNavMenuIsOpen);
        this.isHomePage$ = this.router.events.pipe(
            filter<any>(event => event instanceof RouterEvent),
            map((event: RouterEvent) => event.url === '/'),
        );
    }

    openCartDrawer() {
        this.stateService.setState('cartDrawerOpen', true);
    }

    closeCartDrawer() {
        this.stateService.setState('cartDrawerOpen', false);
    }

    chooseLang(lang: {code: string, id: string, name: string}) {
        this.currentLang = lang;
        this.stateService.setLanguage(lang.code);
    }

    setLang(lang: {code: string, id: string, name: string}) {
        if (this.translate.currentLang !== lang.code) {
            const currLang = this.translate.currentLang;
            let url = this.router.url;
            if (url === '/') {
                url += lang.code;
                this.router.navigate([url]);
            } else if (url.startsWith('/' + currLang)) {
                url = url.replace('/' + currLang, '/' + lang.code);
                this.router.navigate([url]);
            }
            setTimeout(() => {
                window.location.reload();
            });
        }
       
        console.log(this.router.url);
    }

    viewMiniCart(): void {
        this.showMiniCart = true;
    }

    hiddenMiniCart(): void {
        this.showMiniCart = false;
    }

    // for testing
    testCurrentLang(): void {
        let langCode = this.stateService.getCurrentLanguage();
    }
    // for testing

    // temporarily
    getAvailableLanguages(): void {
        // this.http.get(`${environment.apiHost}${environment.apiPort}/content-translation`)
        // .subscribe((lang: any) => {
        //     console.log(lang);
        //     this.listlang = lang['languages'];
        //     if (this.translate.currentLang) {
        //         const language = this.listlang.find((lang: any) => lang.code === this.translate.currentLang);
        //         if (language) {
        //             this.chooseLang(language);
        //         }
        //     }
        // })
    }
    // temporarily

    getPages(codelang: String) {
        this.dataService.query<any, any>(GET_PAGES, {
            code: codelang
        }).subscribe((response) => {
            console.log('getPages by lang', response);
            this.listPages = response['getByLang'].items;
            this.stateService.setPages(this.listPages);
        })
    }
}


export const GET_PAGES = gql`
    query GetByLang($code: String!) {
        getByLang(code: $code) {
            items {
                id
                title
                page {
                    id
                    slug
                }
            }
        }
    }
`;
