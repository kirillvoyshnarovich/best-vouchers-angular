import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../../core/providers/data/data.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StateService } from '../../providers/state/state.service';

import { DomSanitizer } from '@angular/platform-browser';
import { distinctUntilChanged } from 'rxjs/operators';

import gql from 'graphql-tag';

@Component({
  selector: 'bv-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss'],
})
export class QuickLinksComponent implements OnInit {

  form: FormGroup;
  mode: any = null;
  subscruption: any = null;
  listPages: any = [];
  currentPage: any = null;
  safeHtml: any = null;
  banners: any = [];

  currentPageSlug: any = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private stateService: StateService,
    private sanitizer: DomSanitizer
  ) {

    this.stateService.page.subscribe((pages) => {
      if (pages) {
        this.listPages = pages;
        if (this.currentPageSlug) {
        }
      }
    });

    this.route.params.subscribe((params: any) => {
      this.currentPageSlug = params.slug;
    });

    this.route.data
    .subscribe((response) => {
      if (response.page) {
        response.page.
        pipe(
          distinctUntilChanged(),
        ).subscribe((r: any) => {
          this.banners = [];
          if (r.translations[0]) {
            this.currentPage = r;
            this.currentPage.banner.forEach((item: any) => {
              item.source = item.source.replace(/\\/g, '/'); // fix later !!!!!!
              this.banners.push(`url(${item.source})`);
            });
            this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(r.translations[0].content);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
    }
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
