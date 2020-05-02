import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bv-paypal-control',
  templateUrl: './paypal-control.component.html',
  styleUrls: ['./paypal-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaypalControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
