import * as React from 'react';
import { useForceUpdate } from './hooks';
import EventManager from './EventManager';
import { PrivateSheetManager } from './SheetManager';
import { DEFAULT_CONTEXT_NAME } from './constants';
import {
  ProviderCurrentContext,
  CurrentSheetInstanceContext,
} from './Contexts';
import type { SheetID, SheetIds, BottomSheetInstance } from './types';

export interface SheetWrapperProps {
  id: SheetID<SheetIds>;
  context: string;
}

export interface SheetManagerProviderProps {
  context?: string;
}

const SheetWrapper: React.FC<SheetWrapperProps> = (props) => {
  const { id, context: contextProp } = props;
  const [payload, setPayload] = React.useState<unknown>();
  const [visible, setVisible] = React.useState(false);
  const sheetInstanceRef = React.useRef<BottomSheetInstance>(null);

  const SheetComponent = PrivateSheetManager.getSheetComponent(id, contextProp);

  React.useEffect(() => {
    const subscriptions = [
      EventManager.onCloseSheet(id, (_: any, context) => {
        if (context !== contextProp) {
          return;
        }

        setVisible(false);
        setPayload(undefined);
      }),
      EventManager.onShowSheetWrapper(id, (data, context) => {
        if (context !== contextProp) {
          return;
        }

        setPayload(data);
        setVisible(true);
      }),
      EventManager.onHideSheetWrapper(id, (data, context) => {
        if (context !== contextProp) {
          return;
        }

        EventManager.hideSheet(id, data, context);
      }),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, [id, contextProp]);

  React.useEffect(() => {
    if (visible) {
      EventManager.showSheet(id, payload, contextProp);
    }
  }, [id, visible, payload, contextProp]);

  if (!SheetComponent) {
    return null;
  }

  return visible ? (
    <ProviderCurrentContext.Provider value={contextProp}>
      <CurrentSheetInstanceContext.Provider value={sheetInstanceRef}>
        {/* @ts-ignore */}
        <SheetComponent id={id} payload={payload} context={contextProp} />
      </CurrentSheetInstanceContext.Provider>
    </ProviderCurrentContext.Provider>
  ) : null;
};

const SheetManagerProviderComponent: React.FC<
  React.PropsWithChildren<SheetManagerProviderProps>
> = (props) => {
  const { children, context = DEFAULT_CONTEXT_NAME } = props;

  const forceUpdate = useForceUpdate();
  const sheetIds = Object.keys(
    PrivateSheetManager.getRegistry(context)
  ) as SheetIds[];

  const handleRegister = React.useCallback(() => forceUpdate(), [forceUpdate]);

  React.useEffect(() => {
    PrivateSheetManager.registerContext(context);

    const subscription = EventManager.onRegisterSheet(context, handleRegister);

    return () => {
      subscription.remove();
      PrivateSheetManager.unregisterContext(context);
    };
  }, [context, handleRegister]);

  return (
    <React.Fragment>
      {children}
      {sheetIds.length > 0 ? (
        <React.Fragment>
          {sheetIds.map((id) => (
            <SheetWrapper key={id} id={id} context={context} />
          ))}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const SheetManagerProvider = React.memo(SheetManagerProviderComponent);

if (__DEV__) {
  SheetWrapper.displayName = 'SheetWrapper';
  SheetManagerProvider.displayName = 'SheetManagerProvider';
}

export default SheetManagerProvider;
