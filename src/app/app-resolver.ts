import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { distinctUntilChanged, map, shareReplay, take, tap } from 'rxjs/operators';

import { StateService } from './core/providers/state/state.service';

import { DataService } from './core/providers/data/data.service';

@Injectable({ providedIn: 'root' })
export class PageResolver implements Resolve<any> {
  constructor(
    private dataService: DataService,
    private router: Router,
    private stateService: StateService,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const params = route.params;

    let slug = null;
    let code = null;
    let i = 0;
    if (!params.slug) {
      while (!slug) {
        if (route.url[i].path === 'product') {
          slug = 'product';
        } else if (route.url[i].path  === 'category') {
          slug = 'category';
        } else if (route.url[i].path === 'home') {
          slug = 'home';
        }
        i++;
      }
    } else {
      slug = params.slug;
    }

    code = (params.lang) ? params.lang : 'en';

    const pageContent$ = this.dataService.query<any>(GET_PAGE_BY_SLUG, {
      options: {
        code,
        slug,
      },
    }).pipe(
      distinctUntilChanged(),
      map(data => data.getBySlug),
      map(data => {
        data.banner = data.banner.map((item: any) => {
          let bt = {};
          if (item.bannerTranslations && item.bannerTranslations[0]) {
            bt = {...item.bannerTranslations[0]};
          }
          delete item.bannerTranslations;
          item = {
            ...item,
            ...bt,
          };
          return item;
        });
        return data;
      }),
    );
    const stream = pageContent$.pipe(
      shareReplay(1),
    );
    return stream.pipe(
      take(1),
      map(() => stream),
    );
  }
}

export const GET_PAGE_BY_SLUG = gql`
  query GetBySlug($options: optionsPageShop!) {
    getBySlug(options: $options) {
      id
      name
      translations {
        id
        title
        description
        content
        published
      }
      advertising {
        id
        alt
        location
        link
        code
        product {
          id
          translations {
            id
            name
            slug
          }
        }
        category
        source
      }
      banner {
        id
        source
        bannerTranslations {
          id
          alt
          description
          headerBanner
          buttonText
          category
          code
        }
      }
    }
  }
`;