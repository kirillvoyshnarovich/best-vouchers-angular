import { Injectable, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import  { ApolloClient, FetchPolicy, NetworkStatus } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    loadData: EventEmitter<boolean> = new EventEmitter(true);
    client: any;

    private readonly context =  {
        headers: {},
    };

    constructor(private apollo: Apollo, private translate: TranslateService) {
        this.client = this.apollo.getClient() as any;
     }

    query<T = any, V = any>(query: DocumentNode, variables?: V, fetchPolicy?: FetchPolicy): Observable<T> {

        const {apiHost, apiPort, shopApiPath} = environment;

        if (this.client.link.options.uri.indexOf('?languageCode=' + this.translate.currentLang) === -1) {
            const lang = this.translate.currentLang ? this.translate.currentLang : 'en';
            this.client.link.options.uri = `${apiHost}:${apiPort}/${shopApiPath}?languageCode=${lang}`;
        }

        return this.apollo.watchQuery<T, V>({
            query,
            variables,
            context: this.context,
            fetchPolicy: fetchPolicy || 'cache-first',
        }).valueChanges.pipe(
            filter(result => result.networkStatus === NetworkStatus.ready),
            map(response => response.data));
    }

    mutate<T = any, V = any>(mutation: DocumentNode, variables?: V): Observable<T> {
        return this.apollo.mutate<T, V>({
            mutation,
            variables,
            context: this.context,
        }).pipe(map(response => response.data as T));
    }
}
