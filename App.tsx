import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import ListContact from 'screens/ListContact';

export default function App() {
  return (
    <PaperProvider>
      <ListContact />
    </PaperProvider>
  );
}
