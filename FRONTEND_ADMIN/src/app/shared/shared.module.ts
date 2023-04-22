import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { TranslateModule } from '@ngx-translate/core';

import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CountdownModule } from 'ngx-countdown';

const THIRDMODULES = [CountdownModule, DragDropModule];

import { LockModalComponent } from './components/modal/lock-modal/lock-modal.component';
import { QtvModalComponent } from './components/modal/qtv-modal/qtv-modal.component';
import { ImgComponent } from './components/img/img.component';
import { StatusLabelComponent } from './components/status-label/status-label.component';
import { AddressComponent } from './components/address/address.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessagesComponent } from './components/messages/messages.component';
import { LangsComponent } from './components/langs/langs.component';
import { EditorComponent } from './components/editor/editor.component';
import { FormatDatePipe, GenderPipe } from './pipes';
import { QUICK_CHAT_COMPONENTS } from './components/quick-chat';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { ScrollbarDirective } from './components/scrollbar/scrollbar.directive';
import { AgGridModule } from 'ag-grid-angular';
import { DeleteModalComponent } from './components/modal/delete-modal/delete-modal.component';
import {
  BtnCellRenderComponent,
  StatusCellRenderComponent,
  PaymentTypeCellRenderComponent,
  StatusDeleteCellRenderComponent,
  StatusImportCellRenderComponent,
  StatusNameCellRenderComponent,
  IsQtvCellRenderComponent,
} from './ag-grid/index';
import { ImgDirective } from './components/img/img.directive';
import { DelayDirective } from './components/delay/delay.directive';
import { MasonryDirective } from './components/masonry/masonry.directive';
import { MouseFocusDirective } from './components/mouse-focus/mouse-focus.directive';

const COMPONENTS_ENTRY = [
    LangsComponent,
    ImgComponent,
    FileManagerComponent,
    StatusLabelComponent,
    AddressComponent,
    LoaderComponent,
    MessagesComponent,
    PaginationComponent,
    ...QUICK_CHAT_COMPONENTS,
];
const COMPONENTS = [
    EditorComponent,
    DeleteModalComponent,
    LockModalComponent,
    QtvModalComponent,
    PaymentTypeCellRenderComponent,
    ...COMPONENTS_ENTRY,
];

const DIRECTIVES = [ImgDirective, DelayDirective, MasonryDirective, ScrollbarDirective, MouseFocusDirective]
const PIPES = [FormatDatePipe, GenderPipe];



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonACLModule,
        DelonFormModule,
        AgGridModule.withComponents([
          StatusCellRenderComponent,
          StatusNameCellRenderComponent,
          PaymentTypeCellRenderComponent,
          StatusDeleteCellRenderComponent,
          StatusImportCellRenderComponent,
          BtnCellRenderComponent,
        ]),
        ...SHARED_DELON_MODULES,
        ...SHARED_ZORRO_MODULES,
        // third libs
        ...THIRDMODULES,
    ],
    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],
    entryComponents: COMPONENTS_ENTRY,

    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonACLModule,
        DelonFormModule,
        // i18n
        TranslateModule,
        ...SHARED_DELON_MODULES,
        ...SHARED_ZORRO_MODULES,
        // third libs
        ...COMPONENTS,
        ...THIRDMODULES,
        ...DIRECTIVES
    ]
})

export class SharedModule {}