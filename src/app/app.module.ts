import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
    faGlobe, 
    faShoppingBag, 
    faGlobeEurope, 
    faCheck,
    faTruck,
    faHistory,
    faLock,
    faOutdent,
    faCaretLeft,
    faCaretRight,
    faCog,
    faTrash,
    faChevronLeft,
    faChevronRight,
    faQuestionCircle,
    faCaretDown,
    faPhone,
    faEnvelope,
    faSyncAlt
} from '@fortawesome/free-solid-svg-icons';

import {
    faFacebook,
    faWhatsapp,
    faFacebookF,
    faInstagram,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';

const STATE_KEY = makeStateKey<any>('apollo.state');

class CustomTranslateLoader implements TranslateLoader {
    constructor(
        private http: HttpClient,

        // for testing
        // private prefix: string = '../assets/bestvouchers/i18n/',
        // private suffix: string = '.json',
        // for testing
    ) {

    }

    public getTranslation(lang: string): Observable<any> {

        // for testing
        this.http
            .get(`${environment.apiHost}:${environment.apiPort}/content-translation/${lang}`)
            .subscribe((lang) => {
                console.log('getTranslation', lang);
            })
        // for testing
        
        return this.http
            .get(`${environment.apiHost}:${environment.apiPort}/content-translation/${lang}`);
    }
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserTransferStateModule,
        RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', initialNavigation: 'enabled'}),
        CoreModule,
        SharedModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production, registrationStrategy: 'registerWithDelay:5000'}),
        FontAwesomeModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: CustomTranslateLoader,
                deps: [HttpClient],
            }
        })
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(
        private coreModule: CoreModule,
        private readonly transferState: TransferState,
        private library: FaIconLibrary
    ) {
        this.library.addIcons(
            faGlobe, 
            faShoppingBag, 
            faGlobeEurope, 
            faCheck,
            faTruck,
            faHistory,
            faLock,
            faOutdent,
            faCaretLeft,
            faCaretRight,
            faCog,
            faTrash,
            faChevronLeft,
            faChevronRight,
            faQuestionCircle,
            faCaretDown,
            faPhone,
            faFacebook,
            faEnvelope,
            faWhatsapp,
            faFacebookF,
            faSyncAlt
        );
        const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

        if (isBrowser) {
            this.onBrowser();
        } else {
            this.onServer();
        }
    }

    onServer() {
        this.transferState.onSerialize(STATE_KEY, () => {
            const state = this.coreModule.extractState();
            return state;
        });
    }

    onBrowser() {
        const state = this.transferState.get<any>(STATE_KEY, null);
        this.coreModule.restoreState(state);
    }
}
