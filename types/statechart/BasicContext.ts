import { Contact } from 'types';

export type BasicContext = Pick<
  Contact,
  'name' | 'username' | 'email' | 'phone' | 'website'
>;
