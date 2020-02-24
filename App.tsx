import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import ListContact from 'screens/ListContact';
import store from 'state/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ListContact />
      </PaperProvider>
    </Provider>
  );
}
