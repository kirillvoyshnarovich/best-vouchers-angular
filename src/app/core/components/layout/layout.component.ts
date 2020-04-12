import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../../providers/data/data.service';

@Component({
    selector: 'vsf-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

    public load: boolean = true;
    constructor(
        private dataService: DataService
    ) {
        this.dataService.loadData.subscribe((event: boolean) => {
            this.load = event;
        })
    }
}
