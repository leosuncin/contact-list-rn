import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useService } from '@xstate/react';
import TextInput from 'components/TextInput';
import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Button, Divider, Headline } from 'react-native-paper';
import { CreateContactParams } from 'types/CreateContactParams';
import { RootStackParams } from 'types/RootStackParams';

type CompanyTabProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, 'CreateContact'>,
    BottomTabNavigationProp<CreateContactParams, 'Company'>
  >;
  route: RouteProp<CreateContactParams, 'Company'>;
};

const errorMessages = {
  company: {
    empty: 'Name is required',
  },
  catchPhrase: {
    empty: 'Catch phrase is required',
    tooShort: 'Catch phrase should be at least 3 length',
  },
  business: {
    empty: 'Business is required',
    tooShort: 'Catch phrase should be at least 3 length',
  },
};
const CompanyTab: React.FC<CompanyTabProps> = props => {
  const [currentState, sendEvent] = useService(
    props.route.params.companyMachineRef,
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
  }
  function isInvalid(): boolean {
    return currentState
      .toStrings()
      .some(state => state.search(/invalid|pristine/) !== -1);
  }

  return (
    <View style={styles.screen}>
      <Headline>Company</Headline>
      <Divider style={styles.divider} />
      <TextInput
        mode="outlined"
        label="Name"
        autoCapitalize="words"
        error={hasError('company')}
        helperText={getErrorMessage('company')}
        onChangeText={company =>
          sendEvent({ type: 'SET_COMPANY_NAME', company })
        }
      />
      <TextInput
        mode="outlined"
        label="Catch phrase"
        error={hasError('catchPhrase')}
        helperText={getErrorMessage('catchPhrase')}
        onChangeText={catchPhrase =>
          sendEvent({ type: 'SET_CATCH_PHRASE', catchPhrase })
        }
      />
      <TextInput
        mode="outlined"
        label="Business"
        error={hasError('business')}
        helperText={getErrorMessage('business')}
        onChangeText={business => sendEvent({ type: 'SET_BUSINESS', business })}
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
          mode="contained"
          contentStyle={styles.step}
          disabled={isInvalid()}
          onPress={() => {
            props.navigation.navigate('ListContact');
          }}
        >
          Add Contact
        </Button>
      </View>
    </View>
  );
};

export default CompanyTab;

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
