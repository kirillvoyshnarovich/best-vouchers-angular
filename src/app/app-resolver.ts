import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { map, shareReplay, take } from 'rxjs/operators';

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
    let url = this.router.url;
    const pageContent$ = this.dataService.query<any>(GET_PAGE_BY_SLUG, {
      options: {
        code: code,
        slug: slug,
      },
    }).pipe(
      map(data => data.getBySlug),
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

export const GET_PAGE = gql`
  query GetById($options: optionsPageShop!) {
    getById(options: $options) {
      id
      title
      code
      description
      content
      published
      page {
        id
      }
    }
  }
`;

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
        alt
        source
        description
        headerBanner
        buttonText
        category
      }
    }
  }
`;