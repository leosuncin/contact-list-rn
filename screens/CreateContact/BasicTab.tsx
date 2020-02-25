import React from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const BasicTab: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>Basic</Text>
    </View>
  );
};

export default BasicTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 25 : NativeModules.StatusBarManager.HEIGHT,
  },
});
