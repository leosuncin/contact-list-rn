import TextInput from 'components/TextInput';
import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Divider, Headline } from 'react-native-paper';

const CompanyTab: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Headline>Company</Headline>
      <Divider style={styles.divider} />
      <TextInput mode="outlined" label="Name" autoCapitalize="words" />
      <TextInput mode="outlined" label="Catch phrase" />
      <TextInput mode="outlined" label="Business" />
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
