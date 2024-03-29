import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DialogButtonsDirective } from '../core/components/modal-dialog/dialog-buttons.directive';
import { DialogComponentOutletComponent } from '../core/components/modal-dialog/dialog-component-outlet.component';
import { DialogTitleDirective } from '../core/components/modal-dialog/dialog-title.directive';
import { ModalDialogComponent } from '../core/components/modal-dialog/modal-dialog.component';
import { NotificationComponent } from '../core/components/notification/notification.component';

import { AddressFormComponent } from './components/address-form/address-form.component';
import { CartContentsComponent } from './components/cart-contents/cart-contents.component';
import { DropdownContentDirective } from './components/dropdown/dropdown-content.directive';
import { DropdownTriggerDirective } from './components/dropdown/dropdown-trigger.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { AssetPreviewPipe } from './pipes/asset-preview.pipe';
import { CollectionUrlPipe } from './pipes/collection-url.pipe';
import { FormatPricePipe } from './pipes/format-price.pipe';
import { ProductUrlPipe } from './pipes/product-url.pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { TermsConditionsModalComponent } from './components/terms-conditions-modal/terms-conditions-modal.component';
import { PaypalControlComponent } from './components/paypal-control/paypal-control.component';
import { TranslateModule } from '@ngx-translate/core';
import { RenderContentComponent } from './components/render-content/render-content.component';

const SHARED_DECLARATIONS = [
    CartContentsComponent,
    AddressFormComponent,
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownContentDirective,
    DialogButtonsDirective,
    DialogTitleDirective,
    DialogComponentOutletComponent,
    ModalDialogComponent,
    NotificationComponent,
    FormatPricePipe,
    CollectionUrlPipe,
    ProductUrlPipe,
    AssetPreviewPipe,
    ConfirmModalComponent,
    TermsConditionsModalComponent,
    PaypalControlComponent,
    RenderContentComponent
];

const IMPORTS = [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    RouterModule,
    TranslateModule
];

@NgModule({
    declarations: SHARED_DECLARATIONS,
    imports: IMPORTS,
    exports: [...IMPORTS, ...SHARED_DECLARATIONS],
})
export class SharedModule {
}
