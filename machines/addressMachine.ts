import { Address } from 'types';
import {
  AddressStateSchema,
  SetCityEvent,
  SetLatitudeEvent,
  SetLongitudeEvent,
  SetStreetEvent,
  SetSuiteEvent,
  SetZipCodeEvent,
} from 'types/statechart';
import isEmpty from 'validator/lib/isEmpty';
import {
  assign,
  Machine,
  MachineConfig,
  MachineOptions,
  sendParent,
} from 'xstate';

type AddressEvent =
  | SetStreetEvent
  | SetSuiteEvent
  | SetCityEvent
  | SetZipCodeEvent
  | SetLatitudeEvent
  | SetLongitudeEvent;

function isLatitude(value: string): boolean {
  const latitude = parseFloat(value);

  return Number.isFinite(latitude) && Math.abs(latitude) <= 90;
}
function isLongitude(value: string): boolean {
  const longitude = parseFloat(value);

  return Number.isFinite(longitude) && Math.abs(longitude) <= 180;
}

const addressConfig: MachineConfig<
  Address,
  AddressStateSchema,
  AddressEvent
> = {
  id: 'address',
  context: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  type: 'parallel',
  states: {
    street: {
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
        SET_STREET: [
          {
            target: '.invalid.empty',
            actions: 'setStreet',
            cond: 'isStreetEmpty',
          },
          { target: '.valid', actions: ['setStreet', 'sendStreet'] },
        ],
      },
    },
    suite: {
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
        SET_SUITE: [
          {
            target: '.invalid.empty',
            actions: 'setSuite',
            cond: 'isSuiteEmpty',
          },
          { target: '.valid', actions: ['setSuite', 'sendSuite'] },
        ],
      },
    },
    city: {
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
        SET_CITY: [
          {
            target: '.invalid.empty',
            actions: 'setCity',
            cond: 'isCityEmpty',
          },
          { target: '.valid', actions: ['setCity', 'sendCity'] },
        ],
      },
    },
    zipCode: {
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
        SET_ZIP_CODE: [
          {
            target: '.invalid.empty',
            actions: 'setZipCode',
            cond: 'isZipCodeEmpty',
          },
          { target: '.valid', actions: ['setZipCode', 'sendZipCode'] },
        ],
      },
    },
    latitude: {
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
        SET_LATITUDE: [
          {
            target: '.invalid.empty',
            actions: 'setLatitude',
            cond: 'isLatitudeEmpty',
          },
          {
            target: '.invalid.incorrect',
            actions: 'setLatitude',
            cond: 'isLatitudeIncorrect',
          },
          { target: '.valid', actions: ['setLatitude', 'sendLatitude'] },
        ],
      },
    },
    longitude: {
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
        SET_LONGITUDE: [
          {
            target: '.invalid.empty',
            actions: 'setLongitude',
            cond: 'isLongitudeEmpty',
          },
          {
            target: '.invalid.incorrect',
            actions: 'setLongitude',
            cond: 'isLongitudeIncorrect',
          },
          { target: '.valid', actions: ['setLongitude', 'sendLongitude'] },
        ],
      },
    },
  },
};
const addressOptions: Partial<MachineOptions<Address, AddressEvent>> = {
  actions: {
    setStreet: assign((_, event: SetStreetEvent) => ({
      street: event.street,
    })),
    setSuite: assign((_, event: SetSuiteEvent) => ({
      suite: event.suite,
    })),
    setCity: assign((_, event: SetCityEvent) => ({
      city: event.city,
    })),
    setZipCode: assign((_, event: SetZipCodeEvent) => ({
      zipcode: event.zipCode,
    })),
    setLatitude: assign((context, event: SetLatitudeEvent) => ({
      geo: {
        lat: event.latitude,
        lng: context.geo.lng,
      },
    })),
    setLongitude: assign((context, event: SetLongitudeEvent) => ({
      geo: {
        lat: context.geo.lat,
        lng: event.longitude,
      },
    })),
    sendStreet: sendParent((_, event: SetStreetEvent) => event),
    sendSuite: sendParent((_, event: SetSuiteEvent) => event),
    sendCity: sendParent((_, event: SetCityEvent) => event),
    sendZipCode: sendParent((_, event: SetZipCodeEvent) => event),
    sendLatitude: sendParent((_, event: SetLatitudeEvent) => event),
    sendLongitude: sendParent((_, event: SetLongitudeEvent) => event),
  },
  guards: {
    isStreetEmpty(_, event: SetStreetEvent) {
      return isEmpty(event.street);
    },
    isSuiteEmpty(_, event: SetSuiteEvent) {
      return isEmpty(event.suite);
    },
    isCityEmpty(_, event: SetCityEvent) {
      return isEmpty(event.city);
    },
    isZipCodeEmpty(_, event: SetZipCodeEvent) {
      return isEmpty(event.zipCode);
    },
    isLatitudeEmpty(_, event: SetLatitudeEvent) {
      return isEmpty(event.latitude);
    },
    isLatitudeIncorrect(_, event: SetLatitudeEvent) {
      return !isLatitude(event.latitude);
    },
    isLongitudeEmpty(_, event: SetLongitudeEvent) {
      return isEmpty(event.longitude);
    },
    isLongitudeIncorrect(_, event: SetLongitudeEvent) {
      return !isLongitude(event.longitude);
    },
  },
};

export default Machine(addressConfig, addressOptions);
