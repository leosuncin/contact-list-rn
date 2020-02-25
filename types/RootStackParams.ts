import { Contact } from './Contact';

export type RootStackParams = {
  ListContact: undefined;
  ShowContact: {
    contact: Contact;
  };
  CreateContact: undefined;
};
