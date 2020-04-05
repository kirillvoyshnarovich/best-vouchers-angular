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
    listlang = [
        'English',
        'Polski',
        'Ελληνικά',
        'Český',
        'Português',
        'Magyar',
        'Français',
        'Български',
        'Hrvatski',
        'Italiano',
        'Slovenský',
        'Slovenščina',
        'Eesti',
        'Deutsch',
        'Lietuvių',
        'Español',
        'Latviešu',
        'Turkish',
        'Indonesia',
        'Română'
    ];
    currentLang: any = null;

    showMiniCart = false;

    // @HostListener('scroll') scroll() {
    // }

    // @HostListener("window:scroll", ['$event']) onWindowScroll(event: any) {
    // }

    constructor(private router: Router,
                private stateService: StateService) {
    }

    ngOnInit(): void {
        this.cartDrawerVisible$ = this.stateService.select(state => state.cartDrawerOpen);
        this.mobileNavVisible$ = this.stateService.select(state => state.mobileNavMenuIsOpen);
        this.isHomePage$ = this.router.events.pipe(
            filter<any>(event => event instanceof RouterEvent),
            map((event: RouterEvent) => event.url === '/'),
        );
        this.currentLang = this.listlang[0];
    }

    openCartDrawer() {
        this.stateService.setState('cartDrawerOpen', true);
    }

    closeCartDrawer() {
        this.stateService.setState('cartDrawerOpen', false);
    }

    chooseLang(lang: void) {
        this.currentLang = lang;
    }

    viewMiniCart(): void {
        this.showMiniCart = true;
    }

    hiddenMiniCart(): void {
        this.showMiniCart = false;
    }

}
