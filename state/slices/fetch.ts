import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'state/store';
import { loadContacts } from './contact';

type FetchState = {
  state: 'ready' | 'loading' | 'loaded' | 'fail';
  error: string | null;
};
type FetchReducers = {
  switchState: (state: FetchState) => void;
  setError: (state: FetchState, action: PayloadAction<string>) => void;
};

const fetchSlice = createSlice<FetchState, FetchReducers>({
  name: 'fetch',
  initialState: {
    state: 'ready',
    error: null,
  },
  reducers: {
    switchState(state) {
      switch (state.state) {
        case 'ready':
          state.state = 'loading';
          break;
        case 'loading':
          state.state = state.error ? 'fail' : 'loaded';
          break;
        case 'fail':
          state.state = 'ready';
          break;
      }
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export function fetchContacts(): AppThunk {
  return async (dispatch, getState) => {
    const { switchState, setError } = fetchSlice.actions;
    try {
      if (getState().fetch.state !== 'ready') {
        return;
      }
      dispatch(switchState());
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      if (response.ok) {
        const json = await response.json();
        dispatch(loadContacts(json));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      dispatch(switchState());
    }
  };
}
export default fetchSlice.reducer;
