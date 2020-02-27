import { InputStateSchema } from '.';

export type AddressStateSchema = {
  states: {
    street: InputStateSchema;
    suite: InputStateSchema;
    city: InputStateSchema;
    zipCode: InputStateSchema;
    latitude: InputStateSchema;
    longitude: InputStateSchema;
  };
};
