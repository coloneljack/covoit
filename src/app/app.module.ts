import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AddressComponent } from './address/address.component';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { AppService } from './app.service';
import './rxjs-operators';
import { CoworkerCardComponent } from './shared/components/coworker-card/coworker-card.component';
import { RouteDirective } from './shared/directives/route.directive';
import { GmapsService } from './shared/services/gmaps.service';


@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    CoworkerCardComponent,
    RouteDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    GmapsService,
    AppService,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
