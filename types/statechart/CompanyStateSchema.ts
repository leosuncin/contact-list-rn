import { InputStateSchema } from '.';

export type CompanyStateSchema = {
  states: {
    company: InputStateSchema;
    catchPhrase: InputStateSchema;
    business: InputStateSchema;
  };
};
