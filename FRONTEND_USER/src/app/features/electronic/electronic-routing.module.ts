import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./layout-page/layout-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { NgModule } from "@angular/core";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactComponent } from "./contact/contact.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ShopPageComponent } from "./shop-page/shop-page.component";
import { AccountDetailComponent } from "./account-detail/account-detail.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ConfirmComponent } from "./confirm/confirm.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
            },
            {
                path: 'shop',
                component: ShopPageComponent
            },
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'about-us',
                component: AboutUsComponent
            },
            {
                path: 'account-detail',
                component: AccountDetailComponent,
            },
            {
                path: 'product-detail/:id',
                component: ProductDetailComponent,
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'cart',
                component: CartDetailComponent
            },
            {
                path: 'checkout',
                component: CheckoutComponent
            },
            {
                path: 'confirm/:id',
                component: ConfirmComponent,
                data: { title: 'Đặt hàng thành công' },
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ElectronicRoutingModule { }