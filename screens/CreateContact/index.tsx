import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AddressTab from './AddressTab';
import BasicTab from './BasicTab';
import CompanyTab from './CompanyTab';

const Tab = createBottomTabNavigator();
const CreateContact: React.FC = () => {
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
      />
    </Tab.Navigator>
  );
};

export default CreateContact;
