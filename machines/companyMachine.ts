import { Company } from 'types';
import {
  CompanyStateSchema,
  FinishEvent,
  SetBusinessEvent,
  SetCatchPhraseEvent,
  SetCompanyNameEvent,
} from 'types/statechart';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import {
  assign,
  Machine,
  MachineConfig,
  MachineOptions,
  sendParent,
} from 'xstate';

type CompanyEvent =
  | SetCompanyNameEvent
  | SetCatchPhraseEvent
  | SetBusinessEvent
  | FinishEvent;

const companyConfig: MachineConfig<
  Company,
  CompanyStateSchema,
  CompanyEvent
> = {
  id: 'company',
  context: {
    name: '',
    catchPhrase: '',
    bs: '',
  },
  type: 'parallel',
  states: {
    company: {
      initial: 'pristine',
      states: {
        pristine: {},
        valid: {},
        invalid: {
          initial: 'empty',
          states: {
            empty: {},
          },
        },
      },
      on: {
        SET_COMPANY_NAME: [
          {
            target: '.invalid.empty',
            actions: 'setCompanyName',
            cond: 'isCompanyNameEmpty',
          },
          { target: '.valid', actions: ['setCompanyName', 'sendCompanyName'] },
        ],
      },
    },
    catchPhrase: {
      initial: 'pristine',
      states: {
        pristine: {},
        valid: {},
        invalid: {
          initial: 'empty',
          states: {
            empty: {},
            tooShort: {},
          },
        },
      },
      on: {
        SET_CATCH_PHRASE: [
          {
            target: '.invalid.empty',
            actions: 'setCatchPhrase',
            cond: 'isCatchPhraseEmpty',
          },
          {
            target: '.invalid.tooShort',
            actions: 'setCatchPhrase',
            cond: 'isCatchPhraseShort',
          },
          { target: '.valid', actions: ['setCatchPhrase', 'sendCatchPhrase'] },
        ],
      },
    },
    business: {
      initial: 'pristine',
      states: {
        pristine: {},
        valid: {},
        invalid: {
          initial: 'empty',
          states: {
            empty: {},
            tooShort: {},
          },
        },
      },
      on: {
        SET_BUSINESS: [
          {
            target: '.invalid.empty',
            actions: 'setBusiness',
            cond: 'isBusinessEmpty',
          },
          {
            target: '.invalid.tooShort',
            actions: 'setBusiness',
            cond: 'isBusinessShort',
          },
          { target: '.valid', actions: ['setBusiness', 'sendBusiness'] },
        ],
      },
    },
  },
  on: {
    FINISH: {
      actions: sendParent('FINISH'),
      cond(context) {
        return (
          !isEmpty(context.name) &&
          isLength(context.catchPhrase, { min: 3 }) &&
          isLength(context.bs, { min: 3 })
        );
      },
    },
  },
};
const companyOptions: Partial<MachineOptions<Company, CompanyEvent>> = {
  actions: {
    setCompanyName: assign((_, event: SetCompanyNameEvent) => ({
      name: event.company,
    })),
    setCatchPhrase: assign((_, event: SetCatchPhraseEvent) => ({
      catchPhrase: event.catchPhrase,
    })),
    setBusiness: assign((_, event: SetBusinessEvent) => ({
      bs: event.business,
    })),
    sendCompanyName: sendParent((_, event: SetCompanyNameEvent) => event),
    sendCatchPhrase: sendParent((_, event: SetCatchPhraseEvent) => event),
    sendBusiness: sendParent((_, event: SetBusinessEvent) => event),
  },
  guards: {
    isCompanyNameEmpty(_, event: SetCompanyNameEvent) {
      return isEmpty(event.company);
    },
    isCatchPhraseEmpty(_, event: SetCatchPhraseEvent) {
      return isEmpty(event.catchPhrase);
    },
    isCatchPhraseShort(_, event: SetCatchPhraseEvent) {
      return !isLength(event.catchPhrase, { min: 3 });
    },
    isBusinessEmpty(_, event: SetBusinessEvent) {
      return isEmpty(event.business);
    },
    isBusinessShort(_, event: SetBusinessEvent) {
      return !isLength(event.business, { min: 3 });
    },
  },
};

export default Machine(companyConfig, companyOptions);
