import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, CreateContact, UpdateContact } from 'types';

type ContactReducers = {
  addContact: (
    state: Array<Contact>,
    action: PayloadAction<CreateContact>,
  ) => void;
  updateContact: (
    state: Array<Contact>,
    action: PayloadAction<UpdateContact>,
  ) => void;
};

const contactSlice = createSlice<Array<Contact>, ContactReducers>({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      state.push({ ...action.payload, id: state.length + 1 });
    },
    updateContact(state, action) {
      const index = state.findIndex(
        contact => contact.id === action.payload.id,
      );
      Object.assign(state[index], action.payload);
    },
  },
});

export const { addContact, updateContact } = contactSlice.actions;
export default contactSlice.reducer;
