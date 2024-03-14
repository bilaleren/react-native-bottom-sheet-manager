import * as React from 'react';
import {
  View,
  Modal,
  Platform,
  StyleSheet,
  BackHandler,
  type ModalProps,
  type NativeSyntheticEvent,
  type NativeEventSubscription,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNBottomSheet, {
  WINDOW_HEIGHT,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetFlatList,
  BottomSheetSectionList,
  BottomSheetVirtualizedList,
  BottomSheetHandle,
  BottomSheetFooter,
  BottomSheetBackdrop,
  BottomSheetFooterContainer,
  BottomSheetTextInput,
  type BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import EventManager from './EventManager';
import { PrivateSheetManager } from './SheetManager';
import { useSheetState } from './hooks';
import { useCurrentSheetInstance, useProviderCurrentContext } from './Contexts';
import type { SheetID, SheetIds, BottomSheetInstance } from './types';

export type BottomSheetProps = Omit<RNBottomSheetProps, 'children'> & {
  /**
   * ID of the `BottomSheet`.
   */
  id: SheetID<SheetIds>;

  /**
   * When set to `true`, the `BottomSheet` is shown in a `ReactNative.Modal`.
   * @default false
   */
  useModal?: boolean;

  /**
   * Content of the `BottomSheet`.
   */
  children: React.ReactNode;

  /**
   * Triggered when `ReactNative.Modal` is shown.
   */
  onModalShow?: (event: NativeSyntheticEvent<any>) => void;

  /**
   * Triggered when `ReactNative.Modal` is closing.
   */
  onModalRequestClose?: (event: NativeSyntheticEvent<any>) => void;

  /**
   * The `supportedOrientations` prop allows the modal to be rotated to any of the specified orientations.
   */
  supportedOrientations?: ModalProps['supportedOrientations'];

  /**
   * Component of the `ReactNative.Modal` container.
   */
  modalContainerComponent?: React.ComponentType;

  /**
   * When set to true, `BottomSheet` is closed when the hardware back button is pressed.
   * @default true
   */
  hardwareBackPressToClose?: boolean;
};

const defaultSnapPoints: readonly number[] = [
  WINDOW_HEIGHT / 2,
  WINDOW_HEIGHT - 200,
];

interface BottomSheetFC
  extends React.MemoExoticComponent<
    React.ForwardRefExoticComponent<BottomSheetProps>
  > {
  <Id extends SheetIds>(
    props: BottomSheetProps & React.RefAttributes<BottomSheetInstance<Id>>
  ): React.JSX.Element;

  // Components
  View: typeof BottomSheetView;
  ScrollView: typeof BottomSheetScrollView;
  FlatList: typeof BottomSheetFlatList;
  SectionList: typeof BottomSheetSectionList;
  VirtualizedList: typeof BottomSheetVirtualizedList;
  Handle: typeof BottomSheetHandle;
  Footer: typeof BottomSheetFooter;
  FooterContainer: typeof BottomSheetFooterContainer;
  Backdrop: typeof BottomSheetBackdrop;
  TextInput: typeof BottomSheetTextInput;
}

const BottomSheetComponent = React.forwardRef<
  BottomSheetInstance,
  BottomSheetProps
>((props, ref) => {
  const {
    id: sheetId,
    useModal = false,
    children,
    snapPoints = defaultSnapPoints,
    onClose,
    onModalShow,
    onModalRequestClose,
    supportedOrientations,
    hardwareBackPressToClose = true,
    modalContainerComponent: ModalContainerComponent = React.Fragment,
    ...other
  } = props;

  const currentCtx = useProviderCurrentContext();
  const valueRef = React.useRef<unknown>();
  const bottomSheetRef = React.useRef<RNBottomSheet>(null);
  const currentSheetInstanceRef = useCurrentSheetInstance();
  const { visible, setVisible } = useSheetState({
    id: sheetId,
    onHide: (data: any) => {
      const bottomSheet = bottomSheetRef.current;

      valueRef.current = data;

      if (bottomSheet) {
        bottomSheet.close();
      }
    },
    onBeforeShow: () => {
      valueRef.current = undefined;
      currentSheetInstanceRef.current = getInstance();
      PrivateSheetManager.registerInstance(sheetId, currentCtx, getInstance());
    },
  });
  const hardwareBackPressEvent = React.useRef<NativeEventSubscription>();

  const getInstance = React.useCallback(
    (): BottomSheetInstance => ({
      close(options = {}): void {
        const bottomSheet = bottomSheetRef.current;

        valueRef.current = (options as Record<string, unknown>).value;

        if (bottomSheet) {
          bottomSheet.close(options.animationConfigs);
        }
      },
      expand(animationConfigs): void {
        const bottomSheet = bottomSheetRef.current;

        if (bottomSheet) {
          bottomSheet.expand(animationConfigs);
        }
      },
      collapse(animationConfigs): void {
        const bottomSheet = bottomSheetRef.current;

        if (bottomSheet) {
          bottomSheet.collapse(animationConfigs);
        }
      },
      snapToIndex(index: number, animationConfigs): void {
        const bottomSheet = bottomSheetRef.current;

        if (bottomSheet) {
          bottomSheet.snapToIndex(index, animationConfigs);
        }
      },
      snapToPosition(position, animationConfigs): void {
        const bottomSheet = bottomSheetRef.current;

        if (bottomSheet) {
          bottomSheet.snapToPosition(position, animationConfigs);
        }
      },
    }),
    []
  );

  const handleModalShow = React.useCallback(
    (event: NativeSyntheticEvent<any>) => {
      const bottomSheet = bottomSheetRef.current;

      if (bottomSheet) {
        bottomSheet.snapToIndex(0);
      }

      onModalShow?.(event);
    },
    [onModalShow]
  );

  const handleCloseSheet = React.useCallback(() => {
    EventManager.closeSheet(sheetId, valueRef.current, currentCtx);
    setVisible(false);
    valueRef.current = undefined;
    hardwareBackPressEvent.current?.remove();
    onClose?.();
  }, [sheetId, currentCtx, setVisible, onClose]);

  const handleRequestClose = React.useCallback(
    (event: NativeSyntheticEvent<any>) => {
      const bottomSheet = bottomSheetRef.current;

      if (bottomSheet) {
        bottomSheet.close();
      }

      onModalRequestClose?.(event);
    },
    [onModalRequestClose]
  );

  React.useEffect(() => {
    currentSheetInstanceRef.current = getInstance();
    PrivateSheetManager.registerInstance(sheetId, currentCtx, getInstance());
  }, [sheetId, getInstance, currentCtx, currentSheetInstanceRef]);

  React.useEffect(() => {
    if (!useModal && Platform.OS === 'android' && hardwareBackPressToClose) {
      hardwareBackPressEvent.current = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          const bottomSheet = bottomSheetRef.current;

          if (bottomSheet) {
            bottomSheet.close();
          }

          return true;
        }
      );
    }

    return () => hardwareBackPressEvent.current?.remove();
  }, [useModal, hardwareBackPressToClose]);

  React.useImperativeHandle(ref, getInstance, [getInstance]);

  const sheet = (
    <View style={styles.sheetContainer}>
      <RNBottomSheet
        {...other}
        ref={bottomSheetRef}
        onClose={handleCloseSheet}
        snapPoints={snapPoints}
      >
        {children}
      </RNBottomSheet>
    </View>
  );

  return visible ? (
    useModal ? (
      <Modal
        visible={true}
        transparent={true}
        animationType="none"
        onShow={handleModalShow}
        onRequestClose={handleRequestClose}
        supportedOrientations={supportedOrientations}
      >
        <GestureHandlerRootView style={styles.handlerRootView}>
          <ModalContainerComponent>{sheet}</ModalContainerComponent>
        </GestureHandlerRootView>
      </Modal>
    ) : (
      <View
        style={[
          StyleSheet.absoluteFill,
          { zIndex: PrivateSheetManager.getSheetZIndex(sheetId, currentCtx) },
        ]}
      >
        {sheet}
      </View>
    )
  ) : null;
});

const BottomSheet = React.memo(BottomSheetComponent) as BottomSheetFC;

BottomSheet.View = BottomSheetView;
BottomSheet.ScrollView = BottomSheetScrollView;
BottomSheet.FlatList = BottomSheetFlatList;
BottomSheet.SectionList = BottomSheetSectionList;
BottomSheet.VirtualizedList = BottomSheetVirtualizedList;
BottomSheet.Handle = BottomSheetHandle;
BottomSheet.Footer = BottomSheetFooter;
BottomSheet.FooterContainer = BottomSheetFooterContainer;
BottomSheet.Backdrop = BottomSheetBackdrop;
BottomSheet.TextInput = BottomSheetTextInput;

if (__DEV__) {
  BottomSheet.displayName = 'BottomSheet';
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
  },
  handlerRootView: {
    flex: 1,
  },
});

export default BottomSheet;
