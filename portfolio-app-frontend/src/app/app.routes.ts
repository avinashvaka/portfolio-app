import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./common/auth.guard";
import {PortfolioHomeComponent} from "./components/portfolio/portfolio-home/portfolio-home.component";
import {AssetDetailsComponent} from "./components/portfolio/asset-details/asset-details.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'portfolios', component: PortfolioHomeComponent, canActivate: [AuthGuard]},
  {path: 'asset-details', component: AssetDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
