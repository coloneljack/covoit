import { Address } from './address';

export interface RouteDetails {
  origin?: Address,
  destination?: Address,
  waypoints?: Array<Address>,
  duration: number,
  distance?: number
}
