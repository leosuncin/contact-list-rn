import {
  BasicInterpreter,
  AddressInterpreter,
  CompanyInterpreter,
} from './statechart';

export type CreateContactParams = {
  Basic: {
    basicMachineRef: BasicInterpreter;
  };
  Address: {
    addressMachineRef: AddressInterpreter;
  };
  Company: {
    companyMachineRef: CompanyInterpreter;
  };
};
