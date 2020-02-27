export type CreateContactStateSchema = {
  states: {
    wizard: {
      states: {
        basic: {};
        address: {};
        company: {};
      };
    };
    finish: {};
  };
};
