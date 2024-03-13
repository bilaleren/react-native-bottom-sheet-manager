import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  BottomSheet,
  type SheetProps,
} from 'react-native-bottom-sheet-manager';

const BasicSheet: React.FC<SheetProps<'basic'>> = ({ id }) => (
  <BottomSheet id={id} style={styles.container}>
    <BottomSheet.View style={styles.contentContainer}>
      <Text>Basic Sheet</Text>
    </BottomSheet.View>
  </BottomSheet>
);

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BasicSheet;
