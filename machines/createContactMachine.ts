import {
  CreateContactContext,
  CreateContactStateSchema,
  SetBusinessEvent,
  SetCatchPhraseEvent,
  SetCityEvent,
  SetCompanyNameEvent,
  SetEmailEvent,
  SetLatitudeEvent,
  SetLongitudeEvent,
  SetNameEvent,
  SetPhoneEvent,
  SetStreetEvent,
  SetSuiteEvent,
  SetUsernameEvent,
  SetWebsiteEvent,
  SetZipCodeEvent,
} from 'types/statechart';
import { assign, Machine, MachineConfig, MachineOptions, spawn } from 'xstate';
import addressMachine from './addressMachine';
import basicMachine from './basicMachine';
import companyMachine from './companyMachine';

type CreateContactEvent =
  | SetNameEvent
  | SetUsernameEvent
  | SetEmailEvent
  | SetPhoneEvent
  | SetWebsiteEvent
  | SetStreetEvent
  | SetSuiteEvent
  | SetCityEvent
  | SetZipCodeEvent
  | SetLatitudeEvent
  | SetLongitudeEvent
  | SetCompanyNameEvent
  | SetCatchPhraseEvent
  | SetBusinessEvent;

const createContactConfig: MachineConfig<
  CreateContactContext,
  CreateContactStateSchema,
  CreateContactEvent
> = {
  id: 'createContact',
  context: {
    contact: {
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    },
    basicMachineRef: null,
    addressMachineRef: null,
    companyMachineRef: null,
  },
  initial: 'wizard',
  states: {
    wizard: {
      type: 'parallel',
      states: {
        basic: {
          entry: assign({
            basicMachineRef: _ => spawn(basicMachine, 'basicChild'),
          }),
          on: {
            SET_NAME: { actions: 'setName' },
            SET_USERNAME: { actions: 'setUsername' },
            SET_EMAIL: { actions: 'setEmail' },
            SET_PHONE: { actions: 'setPhone' },
            SET_WEBSITE: { actions: 'setWebsite' },
          },
        },
        address: {
          entry: assign({
            addressMachineRef: _ => spawn(addressMachine, 'addressChild'),
          }),
          on: {
            SET_STREET: { actions: 'setStreet' },
            SET_SUITE: { actions: 'setSuite' },
            SET_CITY: { actions: 'setCity' },
            SET_ZIP_CODE: { actions: 'setZipCode' },
            SET_LATITUDE: { actions: 'setLatitude' },
            SET_LONGITUDE: { actions: 'setLongitude' },
          },
        },
        company: {
          entry: assign({
            companyMachineRef: _ => spawn(companyMachine, 'companyChild'),
          }),
          on: {
            SET_COMPANY_NAME: { actions: 'setCompanyName' },
            SET_CATCH_PHRASE: { actions: 'setCatchPhrase' },
            SET_BUSINESS: { actions: 'setBusiness' },
          },
        },
      },
    },
    finish: {},
  },
};
const createContactOptions: Partial<MachineOptions<
  CreateContactContext,
  CreateContactEvent
>> = {
  actions: {
    setName: assign((context, event: SetNameEvent) => ({
      contact: {
        ...context.contact,
        name: event.name,
      },
    })),
    setUsername: assign((context, event: SetUsernameEvent) => ({
      contact: {
        ...context.contact,
        username: event.username,
      },
    })),
    setEmail: assign((context, event: SetEmailEvent) => ({
      contact: {
        ...context.contact,
        email: event.email,
      },
    })),
    setPhone: assign((context, event: SetPhoneEvent) => ({
      contact: {
        ...context.contact,
        phone: event.phone,
      },
    })),
    setWebsite: assign((context, event: SetWebsiteEvent) => ({
      contact: {
        ...context.contact,
        website: event.website,
      },
    })),
    setStreet: assign((context, event: SetStreetEvent) => ({
      contact: {
        ...context.contact,
        address: {
          ...context.contact.address,
          street: event.street,
        },
      },
    })),
    setSuite: assign((context, event: SetSuiteEvent) => ({
      contact: {
        ...context.contact,
        address: {
          ...context.contact.address,
          suite: event.suite,
        },
      },
    })),
    setCity: assign((context, event: SetCityEvent) => ({
      contact: {
        ...context.contact,
        address: {
          ...context.contact.address,
          city: event.city,
        },
      },
    })),
    setZipCode: assign((context, event: SetZipCodeEvent) => ({
      contact: {
        ...context.contact,
        address: {
          ...context.contact.address,
          zipcode: event.zipCode,
        },
      },
    })),
    setLatitude: assign((context, event: SetLatitudeEvent) => ({
      contact: {
        ...context.contact,
        address: {
          ...context.contact.address,
          geo: {
            lat: event.latitude,
            lng: context.contact.address.geo.lng,
          },
        },
      },
    })),
    setLongitude: assign((context, event: SetLongitudeEvent) => ({
      contact: {
        ...context.contact,
        address: {
          ...context.contact.address,
          geo: {
            lat: context.contact.address.geo.lat,
            lng: event.longitude,
          },
        },
      },
    })),
    setCompanyName: assign((context, event: SetCompanyNameEvent) => ({
      contact: {
        ...context.contact,
        company: {
          ...context.contact.company,
          name: event.company,
        },
      },
    })),
    setCatchPhrase: assign((context, event: SetCatchPhraseEvent) => ({
      contact: {
        ...context.contact,
        company: {
          ...context.contact.company,
          catchPhrase: event.catchPhrase,
        },
      },
    })),
    setBusiness: assign((context, event: SetBusinessEvent) => ({
      contact: {
        ...context.contact,
        company: {
          ...context.contact.company,
          bs: event.business,
        },
      },
    })),
  },
};

export default Machine(createContactConfig, createContactOptions);
