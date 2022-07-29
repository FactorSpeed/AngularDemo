import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';

import { CurrencyPipe } from "./pipe/custom.currencypipe";

import { AppComponent } from './app.component';

import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';

import { HeroListComponent } from './component/hero/hero-list/hero-list.component';
import { HeroInfoComponent } from './component/hero/hero-info/hero-info.component';
import { MessageComponent } from './component/message/message.component';
import { HeroFormComponent } from './component/hero/hero-form/hero-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HeroListComponent,
    HeroInfoComponent,
    MessageComponent,
    CurrencyPipe,
    HeroFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
