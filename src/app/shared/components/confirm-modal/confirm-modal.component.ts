import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Dialog } from '../../../core/providers/modal/modal-types';

@Component({
  selector: 'bv-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ConfirmModalComponent implements Dialog<any>, OnInit {
  resolveWith: (result?: any) => void;
  
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(value: any) {
    this.resolveWith(value);
  }
}
