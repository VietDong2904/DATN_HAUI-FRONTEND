import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./layout-page/layout-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { NgModule } from "@angular/core";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactComponent } from "./contact/contact.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ShopPageComponent } from "./shop-page/shop-page.component";

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
                path: 'contact',
                component: ContactComponent
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ElectronicRoutingModule { }