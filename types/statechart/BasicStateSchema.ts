import { InputStateSchema, BasicContext } from '.';

export type BasicStateSchema = {
  states: {
    [input in keyof BasicContext]: InputStateSchema;
  };
};
