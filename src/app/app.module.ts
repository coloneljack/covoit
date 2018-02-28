import './rxjs-operators';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { GmapsService } from './shared/services/gmaps.service';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AddressComponent } from './address/address.component';


@NgModule({
  declarations: [
    AppComponent,
    AddressComponent
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
    GmapsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
