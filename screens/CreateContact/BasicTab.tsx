import TextInput from 'components/TextInput';
import React from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Button, Divider, Headline } from 'react-native-paper';

const BasicTab: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Headline>Basic information</Headline>
        <Divider style={styles.divider} />
        <TextInput mode="outlined" label="Full name" autoCapitalize="words" />
        <TextInput
          mode="outlined"
          label="Username"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          mode="outlined"
          label="e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          mode="outlined"
          label="Phone number"
          keyboardType="phone-pad"
        />
        <TextInput
          mode="outlined"
          label="Website"
          autoCapitalize="none"
          keyboardType="url"
        />
        <Button mode="outlined">Next</Button>
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
