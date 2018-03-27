import './rxjs-operators';
import {} from 'googlemaps';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { ROUTES } from './app.routes.module';
import { AroundMeService } from './around-me/around-me.service';
import { UserCardComponent } from './shared/components/user-card/user-card.component';
import { FieldMessageDirective } from './shared/directives/field-message.directive';
import { RouteDirective } from './shared/directives/route.directive';
import { GmapsMapperService } from './shared/services/gmaps-mapper.service';
import { GmapsService } from './shared/services/gmaps.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { AroundMeComponent } from './around-me/around-me.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserInfoService } from './user-info/user-info.service';
import { SearchBoxComponent } from './shared/components/search-box/search-box.component';
import { AddressCardComponent } from './shared/components/address-card/address-card.component';
import { AddressActionsComponent } from './shared/components/address-actions/address-actions.component';
import { WorkingDayComponent } from './user-info/working-day/working-day.component';
import { RouteElementComponent } from './around-me/route-element/route-element.component';


@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    RouteDirective,
    FieldMessageDirective,
    UserInfoComponent,
    AroundMeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    SearchBoxComponent,
    AddressCardComponent,
    AddressActionsComponent,
    WorkingDayComponent,
    RouteElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    RouterModule.forRoot(ROUTES),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    GmapsService,
    GmapsMapperService,
    AroundMeService,
    GoogleMapsAPIWrapper,
    UserInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
