import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'state/rootReducer';
import { Contact, CreateContact, UpdateContact } from 'types';

type ContactReducers = {
  loadContacts: (
    state: Array<Contact>,
    action: PayloadAction<Array<Contact>>,
  ) => void;
  addContact: (
    state: Array<Contact>,
    action: PayloadAction<CreateContact>,
  ) => void;
  updateContact: (
    state: Array<Contact>,
    action: PayloadAction<UpdateContact>,
  ) => void;
  removeContact: (state: Array<Contact>, action: PayloadAction<number>) => void;
};

const contactSlice = createSlice<Array<Contact>, ContactReducers>({
  name: 'contacts',
  initialState: [],
  reducers: {
    loadContacts(state, action) {
      state.push(...action.payload);
    },
    addContact(state, action) {
      state.push({ ...action.payload, id: Date.now() });
    },
    updateContact(state, action) {
      const index = state.findIndex(
        contact => contact.id === action.payload.id,
      );
      Object.assign(state[index], action.payload);
    },
    removeContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const selectContacts = (state: RootState): Array<Contact> =>
  state.contacts;
export const {
  loadContacts,
  addContact,
  updateContact,
  removeContact,
} = contactSlice.actions;
export default contactSlice.reducer;
