import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import CreateContact from 'screens/CreateContact';
import ListContact from 'screens/ListContact';
import ShowContact from 'screens/ShowContact';
import store from 'state/store';
import { RootStackParams } from 'types/RootStackParams';

const Stack = createStackNavigator<RootStackParams>();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ListContact" headerMode="none">
            <Stack.Screen name="ListContact" component={ListContact} />
            <Stack.Screen name="ShowContact" component={ShowContact} />
            <Stack.Screen name="CreateContact" component={CreateContact} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
