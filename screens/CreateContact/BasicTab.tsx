import { useMachine } from '@xstate/react';
import TextInput from 'components/TextInput';
import basicMachine from 'machines/basicMachine';
import React from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Button, Divider, Headline } from 'react-native-paper';

const errorMessages = {
  name: {
    empty: 'Full name is required',
  },
  username: {
    empty: 'Username is required',
    tooShort: 'Username should be at least 5 length',
    incorrect: 'Username should only contains letters, number and dashes',
  },
  email: {
    empty: 'e-mail is required',
    incorrect: 'e-mail is invalid',
  },
  phone: {
    empty: 'Phone number is required',
    incorrect: 'Phone number is invalid',
  },
  website: {
    empty: 'Website is required',
    incorrect: 'Website is invalid',
  },
};
const BasicTab: React.FC = () => {
  const [currentState, sendEvent] = useMachine(basicMachine, {
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
    if (currentState.toStrings().includes(`${name}.invalid.incorrect`)) {
      return errorMessages[name].incorrect;
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Headline>Basic information</Headline>
        <Divider style={styles.divider} />
        <TextInput
          mode="outlined"
          label="Full name"
          autoCapitalize="words"
          error={hasError('name')}
          helperText={getErrorMessage('name')}
          onChangeText={name => sendEvent({ type: 'SET_NAME', name })}
        />
        <TextInput
          mode="outlined"
          label="Username"
          autoCapitalize="none"
          autoCorrect={false}
          error={hasError('username')}
          helperText={getErrorMessage('username')}
          onChangeText={username =>
            sendEvent({ type: 'SET_USERNAME', username })
          }
        />
        <TextInput
          mode="outlined"
          label="e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          error={hasError('email')}
          helperText={getErrorMessage('email')}
          onChangeText={email => sendEvent({ type: 'SET_EMAIL', email })}
        />
        <TextInput
          mode="outlined"
          label="Phone number"
          keyboardType="phone-pad"
          error={hasError('phone')}
          helperText={getErrorMessage('phone')}
          onChangeText={phone => sendEvent({ type: 'SET_PHONE', phone })}
        />
        <TextInput
          mode="outlined"
          label="Website"
          autoCapitalize="none"
          keyboardType="url"
          error={hasError('website')}
          helperText={getErrorMessage('website')}
          onChangeText={website => sendEvent({ type: 'SET_WEBSITE', website })}
        />
        <Button
          mode="outlined"
          onPress={() => console.log(currentState.context)}
        >
          Next
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 25 : NativeModules.StatusBarManager.HEIGHT,
  },
  divider: {
    marginVertical: 10,
  },
});
