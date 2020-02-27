import { Interpreter } from 'xstate';
import {
  BasicContext,
  BasicStateSchema,
  SetEmailEvent,
  SetNameEvent,
  SetPhoneEvent,
  SetUsernameEvent,
  SetWebsiteEvent,
} from '.';

export type BasicInterpreter = Interpreter<
  BasicContext,
  BasicStateSchema,
  | SetNameEvent
  | SetUsernameEvent
  | SetEmailEvent
  | SetPhoneEvent
  | SetWebsiteEvent
>;
