import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export interface AppState {
    signedIn: boolean;
    activeOrderId: string | null;
    lastCollectionId: string | null;
    mobileNavMenuIsOpen: boolean;
    cartDrawerOpen: boolean;
}

export const initialState: AppState = {
    signedIn: false,
    activeOrderId: null,
    lastCollectionId: null,
    mobileNavMenuIsOpen: false,
    cartDrawerOpen: false,
};

/**
 * A simple, observable store of global app state.
 */
@Injectable({
    providedIn: 'root',
})
export class StateService {
    private state: AppState = initialState;
    private readonly stateSubject = new BehaviorSubject<AppState>(initialState);
    private langState = {
        currLang: 'en'
    }
    private listPages = [];
    public page: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(
        private translateService: TranslateService
    ) {
        if (typeof window !== 'undefined') {
            Object.defineProperty(window, 'appState', {
                get: () => this.stateSubject.value,
            });
        }
    }

    setState<T extends keyof AppState>(key: T, value: AppState[T]) {
        this.state[key] = value;
        this.stateSubject.next(this.state);
    }

    select<R>(selector: (state: AppState) => R): Observable<R> {
        return this.stateSubject.pipe(
            map(selector),
            distinctUntilChanged(),
        );
    }

    setLanguage(language: any): void {
        this.translateService.use(language);
    }

    getCurrentLanguage(): string {
        return this.translateService.currentLang;
    }

    // work with list quick links
    setPages(list: any) {
        this.listPages = list;
        this.page.next(this.listPages);
    }

    getPages() {
        return this.listPages;
    }
    // work witj list quick links
}
