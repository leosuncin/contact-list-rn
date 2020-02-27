import { Interpreter } from 'xstate';
import {
  AddressStateSchema,
  SetCityEvent,
  SetLatitudeEvent,
  SetLongitudeEvent,
  SetStreetEvent,
  SetSuiteEvent,
  SetZipCodeEvent,
} from '.';
import { Address } from '..';

export type AddressInterpreter = Interpreter<
  Address,
  AddressStateSchema,
  | SetStreetEvent
  | SetSuiteEvent
  | SetCityEvent
  | SetZipCodeEvent
  | SetLatitudeEvent
  | SetLongitudeEvent
>;
