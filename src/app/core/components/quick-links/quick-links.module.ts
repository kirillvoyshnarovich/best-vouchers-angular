import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickLinksComponent } from './quick-links.component';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '',  component: QuickLinksComponent },
]

@NgModule({
  declarations: [QuickLinksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class QuickLinksModule { }
