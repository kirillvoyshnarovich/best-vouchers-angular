import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  OnChanges,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {
  FormGroup,
  FormControl,
  Validators 
} from '@angular/forms';

@Component({
  selector: 'bv-render-content',
  templateUrl: './render-content.component.html',
  styleUrls: ['./render-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RenderContentComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  form: FormGroup;
  renderContainer: any;
  subscription: any;
  buttonSubmit: any;
  formElements: any;
  validationMessageForm: any;

  @Input() content: any;
  safeHtml: any | null = '';

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  ngAfterViewInit() {
    this.renderContainer = document.querySelector('.render-content');
    this.formElements  = this.renderContainer.querySelector('form');
    if (this.formElements) {
      this.buttonSubmit = this.formElements.querySelector('.simple-button-plugin');
    }
    this.insertMessageBlock();
    const existAllField = this.checkForm();
    console.log('handle from', existAllField);
    if (existAllField && this.buttonSubmit) {
      this.subscription = this.buttonSubmit.addEventListener('click', this.hunbleSubmitForm.bind(this));
    }
  }

  ngOnChanges(changes: any) {};

  ngOnDestroy() {
    this.buttonSubmit.removeEventListener('click');
  }

  hunbleSubmitForm(event: any) {
    event.preventDefault();
    const data: any = {};
    for (let i = 0; i < this.formElements.elements.length; i++) {
      data[`${this.formElements.elements[i].name}`] = this.formElements.elements[i].value;
    }

    this.validationFormBeforeSending(data);
  }

  insertMessageBlock() {
    if (this.buttonSubmit) {
      this.buttonSubmit.insertAdjacentHTML('beforeBegin', '<div id="validation-message-form"></div>');
      this.validationMessageForm = this.formElements.querySelector('#validation-message-form');
    }
  }

  checkForm() {
    let existField = true;
    const fields: any = {
      email: true,
      password: true,
    };

    if (this.formElements) {
      for (let i = 0; i < this.formElements.elements.length; i++) {
        if (!fields[this.formElements.elements[i].name]) {
          existField = false;
        }
      }
    }

    return existField;
  }

  validationFormBeforeSending(values: any) {
    this.validationMessageForm.textContent = '';
    for (const key in values) {
      if (key) {
        if (!values[key]) {
          this.validationMessageForm.textContent = `${key} field is required`;
        }
      }
    }
  }
}
