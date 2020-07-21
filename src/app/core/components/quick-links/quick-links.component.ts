import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../core/providers/data/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../providers/state/state.service';
import { DomSanitizer } from '@angular/platform-browser';
import gql from 'graphql-tag';

@Component({
  selector: 'bv-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss'],
})
export class QuickLinksComponent implements OnInit {

  form: FormGroup;
  mode: any = null;
  subscruption:any = null;
  listPages: any = [];
  currentPage: any = null;
  safeHtml: any = null;

  currentPageSlug: any = null;
  
  constructor (
    private route: ActivatedRoute,
    private dataService: DataService,
    private stateService: StateService,
    private sanitizer:DomSanitizer
  ) {

    this.stateService.page.subscribe((pages) => {
      if(pages) {
        this.listPages = pages;
        if(this.currentPageSlug) {
          this.findPage(this.currentPageSlug);
        }
      }
    })

    this.route.params.subscribe((params: any) => {
      this.currentPageSlug = params.slug;
      this.findPage(this.currentPageSlug);
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    });
  }

  submit() {
    if (this.form.valid){
      const formData = {...this.form.value};
    }
  }

  getPage(id: String) {
    this.dataService.query<any, any>(GET_PAGE, {
      id: id
    }).subscribe((response) => {
      this.currentPage = response.getById;
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.currentPage.content);
    })
  }

  findPage(slug: String) {
    this.listPages.forEach((page: any) => {
      if(slug === page.page.slug) {
        this.getPage(page.id);
      }
    });
  }
}


export const GET_PAGE = gql`
  query GetById($id: String!) {
    getById(id: $id) {
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
