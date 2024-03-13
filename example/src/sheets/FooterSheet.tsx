import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  BottomSheet,
  SheetManager,
  type SheetProps,
} from 'react-native-bottom-sheet-manager';
import { Button } from '../components';
import type { BottomSheetFooterProps } from '@gorhom/bottom-sheet';

const FooterSheet: React.FC<SheetProps<'footer'>> = ({ id }) => {
  const renderFooter = React.useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheet.Footer {...props} style={styles.footer}>
        <Button title="Close" onPress={() => SheetManager.hide(id)} />
      </BottomSheet.Footer>
    ),
    [id]
  );

  return (
    <BottomSheet
      id={id}
      style={styles.container}
      footerComponent={renderFooter}
    >
      <BottomSheet.View style={styles.contentContainer}>
        <Text>Sheet With Backdrop</Text>
      </BottomSheet.View>
    </BottomSheet>
  );
};

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
  footer: {
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#555555',
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FooterSheet;
