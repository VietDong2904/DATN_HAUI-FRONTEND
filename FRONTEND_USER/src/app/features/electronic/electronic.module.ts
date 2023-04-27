import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { CheckboxModule} from 'primeng/checkbox'
import { MessageService } from 'primeng/api';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'primeng/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputNumberModule } from 'primeng/inputnumber';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoginPageComponent } from './login-page/login-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
@NgModule({
    declarations: [
        LoginPageComponent,
        LayoutPageComponent,
        HeaderPageComponent,
        FooterPageComponent,
        BenefitsComponent,
        AboutUsComponent,
        ContactComponent,
        HomePageComponent,
        ShopPageComponent,
        AccountDetailComponent,
        ProductDetailComponent,
        CartDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        BrowserAnimationsModule,
        CommonModule,
        NzRadioModule,
        NzModalModule,
        NzFormModule,
        DialogModule,
        TabViewModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        NzMessageModule,
        NzNotificationModule,
        NzAvatarModule,
        NzIconModule,
        AvatarModule,
        NzButtonModule,
        NzUploadModule,
        FileUploadModule,
        DividerModule,
        ToastModule,
        NzRateModule,
        RatingModule,
        PaginatorModule,
        NzPaginationModule,
        NzTableModule,
        NzCardModule,
        NzCommentModule,
        CardModule,
        SidebarModule,
        BadgeModule,
        NzTreeModule,
        AccordionModule,
        DropdownModule,
        NzSelectModule,
        InputTextareaModule,
        NzTabsModule,
        ConfirmPopupModule,
        InputNumberModule,
        NzEmptyModule,
        NzSpinModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MessageService, { provide: NZ_I18N, useValue: vi_VN }],

})
export class ElectronicModule {}