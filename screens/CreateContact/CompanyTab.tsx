import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const CompanyTab = () => {
  return (
    <View style={styles.screen}>
      <Text>Company</Text>
    </View>
  );
};

export default CompanyTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 25 : NativeModules.StatusBarManager.HEIGHT,
  },
});
