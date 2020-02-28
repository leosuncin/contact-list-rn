import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { useService } from '@xstate/react';
import TextInput from 'components/TextInput';
import React from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Divider, Headline } from 'react-native-paper';
import { CreateContactParams } from 'types/CreateContactParams';

type AddressTabProps = {
  navigation: BottomTabNavigationProp<CreateContactParams, 'Address'>;
  route: RouteProp<CreateContactParams, 'Address'>;
};

const errorMessages = {
  street: {
    empty: 'Street is required',
  },
  suite: {
    empty: 'Suite is required',
  },
  city: {
    empty: 'City is required',
  },
  zipCode: {
    empty: 'Zip code is required',
  },
  latitude: {
    empty: 'Latitude is required',
    incorrect: 'Latitude is invalid',
  },
  longitude: {
    empty: 'Longitude is required',
    incorrect: 'Longitude is invalid',
  },
};
const AddressTab: React.FC<AddressTabProps> = props => {
  const [currentState, sendEvent] = useService(
    props.route.params.addressMachineRef,
  );

  function hasError(name: string): boolean {
    return currentState.matches(`${name}.invalid`);
  }
  function getErrorMessage(name: string) {
    if (currentState.toStrings().includes(`${name}.invalid.empty`)) {
      return errorMessages[name].empty;
    }
    if (currentState.toStrings().includes(`${name}.invalid.tooShort`)) {
      return errorMessages[name].tooShort;
    }
    if (currentState.toStrings().includes(`${name}.invalid.incorrect`)) {
      return errorMessages[name].incorrect;
    }
  }
  function isInvalid(): boolean {
    return currentState
      .toStrings()
      .some(state => state.search(/invalid|pristine/) !== -1);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Headline>Address</Headline>
        <Divider style={styles.divider} />
        <TextInput
          mode="outlined"
          label="Street"
          error={hasError('street')}
          helperText={getErrorMessage('street')}
          onChangeText={street => sendEvent({ type: 'SET_STREET', street })}
        />
        <TextInput
          mode="outlined"
          label="Suite"
          error={hasError('suite')}
          helperText={getErrorMessage('suite')}
          onChangeText={suite => sendEvent({ type: 'SET_SUITE', suite })}
        />
        <TextInput
          mode="outlined"
          label="City"
          autoCapitalize="words"
          error={hasError('city')}
          helperText={getErrorMessage('city')}
          onChangeText={city => sendEvent({ type: 'SET_CITY', city })}
        />
        <TextInput
          mode="outlined"
          label="Zip code"
          error={hasError('zipCode')}
          helperText={getErrorMessage('zipCode')}
          onChangeText={zipCode => sendEvent({ type: 'SET_ZIP_CODE', zipCode })}
        />
        <TextInput
          mode="outlined"
          label="Latitude"
          keyboardType="numeric"
          error={hasError('latitude')}
          helperText={getErrorMessage('latitude')}
          onChangeText={latitude =>
            sendEvent({ type: 'SET_LATITUDE', latitude })
          }
        />
        <TextInput
          mode="outlined"
          label="Longitude"
          keyboardType="numeric"
          error={hasError('longitude')}
          helperText={getErrorMessage('longitude')}
          onChangeText={longitude =>
            sendEvent({ type: 'SET_LONGITUDE', longitude })
          }
        />
        <View style={styles.steps}>
          <Button
            mode="outlined"
            contentStyle={styles.step}
            onPress={() => props.navigation.goBack()}
          >
            Back
          </Button>
          <Button
            mode="outlined"
            contentStyle={styles.step}
            disabled={isInvalid()}
            onPress={() => props.navigation.navigate('Company')}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 25 : NativeModules.StatusBarManager.HEIGHT,
  },
  divider: {
    marginVertical: 10,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  step: {
    minWidth: '40%',
  },
});
