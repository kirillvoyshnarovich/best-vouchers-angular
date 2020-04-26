import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../../providers/data/data.service';

@Component({
    selector: 'bv-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

    constructor(
        private dataService: DataService
    ) {
    }
}
