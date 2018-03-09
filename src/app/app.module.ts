import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AddressComponent } from './address/address.component';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { AppService } from './app.service';
import './rxjs-operators';
import { AddressCardComponent } from './shared/components/address-card/address-card.component';
import { RouteDirective } from './shared/directives/route.directive';
import { GmapsMapperService } from './shared/services/gmaps-mapper.service';
import { GmapsService } from './shared/services/gmaps.service';


@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    AddressCardComponent,
    RouteDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
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
    AppService,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
