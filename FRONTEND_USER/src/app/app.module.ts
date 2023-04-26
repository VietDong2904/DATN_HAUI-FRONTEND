import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ElectronicModule } from './features/electronic/electronic.module';
import { DefaultInterceptor } from './cores';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ElectronicModule
  ],
  providers: [...INTERCEPTOR_PROVIDES,[ { provide: NZ_I18N, useValue: vi_VN } ]],

  bootstrap: [AppComponent]
})
export class AppModule { }
