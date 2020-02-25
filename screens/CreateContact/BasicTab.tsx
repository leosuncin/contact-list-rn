import TextInput from 'components/TextInput';
import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Divider, Headline } from 'react-native-paper';

const BasicTab: React.FC = () => {
  return (
    <View style={styles.screen}>
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
      <TextInput mode="outlined" label="Website" keyboardType="url" />
    </View>
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
