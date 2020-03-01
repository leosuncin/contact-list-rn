import { Interpreter } from 'xstate';
import {
  CompanyStateSchema,
  FinishEvent,
  SetBusinessEvent,
  SetCatchPhraseEvent,
  SetCompanyNameEvent,
} from '.';
import { Company } from '..';

export type CompanyInterpreter = Interpreter<
  Company,
  CompanyStateSchema,
  SetCompanyNameEvent | SetCatchPhraseEvent | SetBusinessEvent | FinishEvent
>;
