import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {HeroListComponent} from "./component/hero/hero-list/hero-list.component";
import {HeroInfoComponent} from "./component/hero/hero-info/hero-info.component";

const routes: Routes = [
  // Home
  { path: '', component: HomeComponent },

  // Hero
  { path: 'heroes/all', component: HeroListComponent },
  { path: 'heroes/:hero/details', component: HeroInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
