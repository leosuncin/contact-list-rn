import { combineReducers } from '@reduxjs/toolkit';
import contactReducer from 'state/slices/contact';
import fetchReducer from 'state/slices/fetch';

const rootReducer = combineReducers({
  contacts: contactReducer,
  fetch: fetchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
