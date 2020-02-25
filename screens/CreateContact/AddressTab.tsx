import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const AddressTab = () => {
  return (
    <View style={styles.screen}>
      <Text>Address</Text>
    </View>
  );
};

export default AddressTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 25 : NativeModules.StatusBarManager.HEIGHT,
  },
});
