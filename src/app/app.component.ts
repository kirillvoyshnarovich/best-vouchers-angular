import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StateService } from './core/providers/state/state.service';

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

    currentLang: any = null;

    showMiniCart = false;

    constructor(private router: Router,
                private stateService: StateService) {

        this.stateService.setLanguage('en');
    }

    ngOnInit(): void {
        this.cartDrawerVisible$ = this.stateService.select(state => state.cartDrawerOpen);
        this.mobileNavVisible$ = this.stateService.select(state => state.mobileNavMenuIsOpen);
        this.isHomePage$ = this.router.events.pipe(
            filter<any>(event => event instanceof RouterEvent),
            map((event: RouterEvent) => event.url === '/'),
        )
        this.currentLang = this.listlang[0];
    }

    openCartDrawer() {
        this.stateService.setState('cartDrawerOpen', true);
    }

    closeCartDrawer() {
        this.stateService.setState('cartDrawerOpen', false);
    }

    chooseLang(lang: {code: string}) {
        this.currentLang = lang;
        this.stateService.setLanguage(lang.code);
    }

    viewMiniCart(): void {
        this.showMiniCart = true;
    }

    hiddenMiniCart(): void {
        this.showMiniCart = false;
    }

}
