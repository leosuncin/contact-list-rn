import { AddressInterpreter, BasicInterpreter, CompanyInterpreter } from '.';
import { CreateContact } from '..';

export type CreateContactContext = {
  contact: CreateContact;
  basicMachineRef: BasicInterpreter;
  addressMachineRef: AddressInterpreter;
  companyMachineRef: CompanyInterpreter;
};
