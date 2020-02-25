import TextInput from 'components/TextInput';
import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Divider, Headline } from 'react-native-paper';

const AddressTab: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Headline>Address</Headline>
      <Divider style={styles.divider} />
      <TextInput mode="outlined" label="Street" />
      <TextInput mode="outlined" label="Suite" />
      <TextInput mode="outlined" label="City" />
      <TextInput mode="outlined" label="Zip code" />
      <TextInput mode="outlined" label="Latitude" keyboardType="numeric" />
      <TextInput mode="outlined" label="Longitude" keyboardType="numeric" />
    </View>
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
});
