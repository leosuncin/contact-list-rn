import { useMachine } from '@xstate/react';
import TextInput from 'components/TextInput';
import companyMachine from 'machines/companyMachine';
import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Button, Divider, Headline } from 'react-native-paper';

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
const CompanyTab: React.FC = () => {
  const [currentState, sendEvent] = useMachine(companyMachine, {
    devTools: __DEV__,
  });

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
      <Button
        mode="outlined"
        onPress={() =>
          console.log(currentState.context, currentState.toStrings())
        }
      >
        Next
      </Button>
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
});
