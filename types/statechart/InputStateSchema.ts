export type InputStateSchema = {
  states: {
    pristine: {};
    valid: {};
    invalid: {
      states: {
        empty: {};
        tooShort?: {};
        incorrect?: {};
      };
    };
  };
};
