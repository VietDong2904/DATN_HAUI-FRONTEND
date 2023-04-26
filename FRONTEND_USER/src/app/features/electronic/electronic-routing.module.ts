import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./layout-page/layout-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {
                path: 'login',
                component: LoginPageComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ElectronicRoutingModule { }