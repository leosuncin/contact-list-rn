import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as Input, HelperText } from 'react-native-paper';

type InputTextProps = React.ComponentProps<typeof Input> & {
  helperText?: string;
};

const TextInput: React.FC<InputTextProps> = props => {
  const { helperText, ...inputProps } = props;

  return (
    <View style={styles.container}>
      <Input {...inputProps} style={styles.input} />
      {helperText && (
        <HelperText
          importantForAccessibility="yes"
          type={props.error ? 'error' : 'info'}
        >
          {helperText}
        </HelperText>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    marginBottom: 4,
  },
  helperText: {
    fontSize: 14,
    paddingBottom: 4,
  },
});

export default TextInput;
