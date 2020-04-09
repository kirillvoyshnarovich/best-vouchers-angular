import { Component, OnInit } from '@angular/core';
import { Dialog } from '../../../core/providers/modal/modal-types';

@Component({
  selector: 'vsf-terms-conditions-modal',
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.scss']
})
export class TermsConditionsModalComponent implements Dialog<any>, OnInit {
  resolveWith: (result?: any) => void;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(value: any) {

    this.resolveWith(value);
  }

}
