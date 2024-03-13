import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  useSheet,
  BottomSheet,
  type SheetProps,
} from 'react-native-bottom-sheet-manager';
import { Button } from '../components';

const InputSheet: React.FC<SheetProps<'input'>> = ({ id }) => {
  const sheet = useSheet(id);
  const [value, setValue] = React.useState('');

  return (
    <BottomSheet id={id} style={styles.container}>
      <BottomSheet.View style={styles.contentContainer}>
        <BottomSheet.TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
        />

        <Button
          title="Close"
          style={styles.closeButton}
          onPress={() => {
            sheet?.close({ value });
          }}
        />
      </BottomSheet.View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    minHeight: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    borderColor: '#555555',
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
  },
});

export default InputSheet;
