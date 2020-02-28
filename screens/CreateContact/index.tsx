import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMachine } from '@xstate/react';
import createContactMachine from 'machines/createContactMachine';
import React from 'react';
import { CreateContactParams } from 'types/CreateContactParams';
import AddressTab from './AddressTab';
import BasicTab from './BasicTab';
import CompanyTab from './CompanyTab';

const Tab = createBottomTabNavigator<CreateContactParams>();
const CreateContact: React.FC = () => {
  const [state] = useMachine(createContactMachine, {
    devTools: __DEV__,
  });

  return (
    <Tab.Navigator initialRouteName="Basic">
      <Tab.Screen
        name="Basic"
        component={BasicTab}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-outline' : 'account'}
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{
          basicMachineRef: state.context.basicMachineRef,
        }}
      />
      <Tab.Screen
        name="Address"
        component={AddressTab}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'home-outline' : 'home'}
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{
          addressMachineRef: state.context.addressMachineRef,
        }}
      />
      <Tab.Screen
        name="Company"
        component={CompanyTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="office-building"
              color={color}
              size={size}
            />
          ),
        }}
        initialParams={{
          companyMachineRef: state.context.companyMachineRef,
        }}
      />
    </Tab.Navigator>
  );
};

export default CreateContact;
