import { Injectable } from '@angular/core';
import { Address } from '../entities/address';

@Injectable()
export class GmapsMapperService {

  constructor() { }

  public toAddress(place: google.maps.places.PlaceResult): Address {
    if (!place.geometry || !place.geometry.location) {
      return null;
    }

    const streetNumber = place.address_components.find(c => c.types.indexOf('street_number') !== -1);
    const streetName = place.address_components.find(c => c.types.indexOf('route') !== -1);
    const zip = place.address_components.find(c => c.types.indexOf('postal_code') !== -1);
    const city = place.address_components.find(c => c.types.indexOf('locality') !== -1);
    const country = place.address_components.find(c => c.types.indexOf('country') !== -1);

    return {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      title: place.formatted_address,
      streetNumber: streetNumber ? streetNumber.long_name : undefined,
      streetName: streetName ? streetName.long_name : undefined,
      zip: zip ? zip.long_name : undefined,
      city: city ? city.long_name : undefined,
      country: country ? country.long_name : undefined
    };
  }

}