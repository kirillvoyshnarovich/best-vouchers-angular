import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'bv-render-content',
  templateUrl: './render-content.component.html',
  styleUrls: ['./render-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RenderContentComponent implements OnInit, OnChanges {

  @Input() content: any;
  safeHtml: any | null = '';
  textContent = `<span style="font-size:28px">TEST SPAN !!!!!!!!</span>`




  constructor(
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log('content', this.content);
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.content);
    console.log('safeHtml', this.safeHtml)
  }

  ngOnChanges(changes: any) {
    console.log('chnages', changes);
  }

}
