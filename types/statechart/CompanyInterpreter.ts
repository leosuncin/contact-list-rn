import { Interpreter } from 'xstate';
import {
  CompanyStateSchema,
  SetBusinessEvent,
  SetCatchPhraseEvent,
  SetCompanyNameEvent,
} from '.';
import { Company } from '..';

export type CompanyInterpreter = Interpreter<
  Company,
  CompanyStateSchema,
  SetCompanyNameEvent | SetCatchPhraseEvent | SetBusinessEvent
>;
