import { Address } from './Address';
import { Company } from './Company';

export type Contact = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type CreateContact = Omit<Contact, 'id'>;

export type UpdateContact = Readonly<Pick<Contact, 'id'>> &
  Partial<Omit<CreateContact, 'address' | 'company'>> & {
    address?: Partial<Address>;
    company?: Partial<Company>;
  };
