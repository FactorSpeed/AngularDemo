import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import {CurrencyPipe} from "./pipe/custom.currencypipe";

import { AppComponent } from './app.component';

import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';

import { HeroListComponent } from './component/hero/hero-list/hero-list.component';
import { HeroInfoComponent } from './component/hero/hero-info/hero-info.component';
import { MessageComponent } from './component/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HeroListComponent,
    HeroInfoComponent,
    MessageComponent,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
