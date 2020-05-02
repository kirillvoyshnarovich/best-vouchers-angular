import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'bv-layout-footer',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutFooterComponent {
}
