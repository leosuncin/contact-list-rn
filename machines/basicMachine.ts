import {
  BasicContext,
  BasicStateSchema,
  SetEmailEvent,
  SetNameEvent,
  SetPhoneEvent,
  SetUsernameEvent,
  SetWebsiteEvent,
} from 'types/statechart';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import isURL from 'validator/lib/isURL';
import matches from 'validator/lib/matches';
import { assign, Machine, MachineConfig, MachineOptions } from 'xstate';

type BasicEvent =
  | SetNameEvent
  | SetUsernameEvent
  | SetEmailEvent
  | SetPhoneEvent
  | SetWebsiteEvent;

const basicConfig: MachineConfig<BasicContext, BasicStateSchema, BasicEvent> = {
  id: 'basic',
  context: {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  },
  type: 'parallel',
  states: {
    name: {
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
        SET_NAME: [
          {
            target: '.invalid.empty',
            actions: 'setName',
            cond: 'isNameEmpty',
          },
          { target: '.valid', actions: 'setName' },
        ],
      },
    },
    username: {
      initial: 'pristine',
      states: {
        pristine: {},
        valid: {},
        invalid: {
          initial: 'empty',
          states: {
            empty: {},
            tooShort: {},
            incorrect: {},
          },
        },
      },
      on: {
        SET_USERNAME: [
          {
            target: '.invalid.empty',
            actions: 'setUsername',
            cond: 'isUsernameEmpty',
          },
          {
            target: '.invalid.tooShort',
            actions: 'setUsername',
            cond: 'isUsernameShort',
          },
          {
            target: '.invalid.incorrect',
            actions: 'setUsername',
            cond: 'isUsernameIncorrect',
          },
          { target: '.valid', actions: 'setUsername' },
        ],
      },
    },
    email: {
      initial: 'pristine',
      states: {
        pristine: {},
        valid: {},
        invalid: {
          initial: 'empty',
          states: {
            empty: {},
            incorrect: {},
          },
        },
      },
      on: {
        SET_EMAIL: [
          {
            target: '.invalid.empty',
            actions: 'setEmail',
            cond: 'isEmailEmpty',
          },
          {
            target: '.invalid.incorrect',
            actions: 'setEmail',
            cond: 'isEmailIncorrect',
          },
          { target: '.valid', actions: 'setEmail' },
        ],
      },
    },
    phone: {
      initial: 'pristine',
      states: {
        pristine: {},
        valid: {},
        invalid: {
          initial: 'empty',
          states: {
            empty: {},
            incorrect: {},
          },
        },
      },
      on: {
        SET_PHONE: [
          {
            target: '.invalid.empty',
            actions: 'setPhone',
            cond: 'isPhoneEmpty',
          },
          {
            target: '.invalid.incorrect',
            actions: 'setPhone',
            cond: 'isPhoneIncorrect',
          },
          { target: '.valid', actions: 'setPhone' },
        ],
      },
    },
    website: {
      initial: 'pristine',
      states: {
        pristine: {},
        valid: {},
        invalid: {
          initial: 'empty',
          states: {
            empty: {},
            incorrect: {},
          },
        },
      },
      on: {
        SET_WEBSITE: [
          {
            target: '.invalid.empty',
            actions: 'setWebsite',
            cond: 'isWebsiteEmpty',
          },
          {
            target: '.invalid.incorrect',
            actions: 'setWebsite',
            cond: 'isWebsiteIncorrect',
          },
          { target: '.valid', actions: 'setWebsite' },
        ],
      },
    },
  },
};
const basicOptions: Partial<MachineOptions<BasicContext, BasicEvent>> = {
  actions: {
    setName: assign((_, event: SetNameEvent) => ({
      name: event.name,
    })),
    setUsername: assign((_, event: SetUsernameEvent) => ({
      username: event.username.toLocaleLowerCase(),
    })),
    setEmail: assign((_, event: SetEmailEvent) => ({
      email: event.email.toLocaleLowerCase(),
    })),
    setPhone: assign((_, event: SetPhoneEvent) => ({ phone: event.phone })),
    setWebsite: assign((_, event: SetWebsiteEvent) => ({
      website: event.website,
    })),
  },
  guards: {
    isNameEmpty(_, event: SetNameEvent) {
      return isEmpty(event.name);
    },
    isUsernameEmpty(_, event: SetUsernameEvent) {
      return isEmpty(event.username);
    },
    isUsernameShort(_, event: SetUsernameEvent) {
      return !isLength(event.username, { min: 5 });
    },
    isUsernameIncorrect(_, event: SetUsernameEvent) {
      return matches(event.username, /[^a-zA-Z0-9_-]/);
    },
    isEmailEmpty(_, event: SetEmailEvent) {
      return isEmpty(event.email);
    },
    isEmailIncorrect(_, event: SetEmailEvent) {
      return !isEmail(event.email);
    },
    isPhoneEmpty(_, event: SetPhoneEvent) {
      return isEmpty(event.phone);
    },
    isPhoneIncorrect(_, event: SetPhoneEvent) {
      return !matches(
        event.phone,
        /^\+?(?:503|\(503\))?[\s-]?[2-9]\d{3}[\s-]?\d{4}$/,
      );
    },
    isWebsiteEmpty(_, event: SetWebsiteEvent) {
      return isEmpty(event.website);
    },
    isWebsiteIncorrect(_, event: SetWebsiteEvent) {
      return !isURL(event.website, {
        protocols: ['http', 'https'],
        require_protocol: true,
        disallow_auth: true,
      });
    },
  },
};

export default Machine(basicConfig, basicOptions);
