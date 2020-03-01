import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMachine } from '@xstate/react';
import createContactMachine from 'machines/createContactMachine';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'state/slices/contact';
import { CreateContactParams } from 'types/CreateContactParams';
import { RootStackParams } from 'types/RootStackParams';
import AddressTab from './AddressTab';
import BasicTab from './BasicTab';
import CompanyTab from './CompanyTab';

type CreateContactProps = {
  navigation: StackNavigationProp<RootStackParams, 'CreateContact'>;
};

const Tab = createBottomTabNavigator<CreateContactParams>();
const CreateContact: React.FC<CreateContactProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [state, , service] = useMachine(createContactMachine, {
    devTools: __DEV__,
  });
  const handleDone = useCallback(
    event => {
      dispatch(addContact(event.data));
      navigation.navigate('ListContact');
      service.off(handleDone);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  service.onDone(handleDone);

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
