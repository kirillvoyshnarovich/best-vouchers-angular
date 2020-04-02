import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

@Component({
    selector: 'vsf-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
    @HostListener('scroll') scroll() {
        console.log('scroll in hostListentr IN LAYOUT')
    }
}
