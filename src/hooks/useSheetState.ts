import * as React from 'react';
import EventManager from '../EventManager';
import { useProviderCurrentContext } from '../Contexts';

interface InternalState {
  visible: boolean;
  onHide?: (data: any, context: string) => void;
  onBeforeShow?: (data: any, context: string) => void;
}

interface UseSheetStateProps {
  id: string;
  onHide?: (data: any, context: string) => void;
  onBeforeShow?: (data: any, context: string) => void;
}

interface UseSheetStateReturn {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function useSheetState(props: UseSheetStateProps): UseSheetStateReturn {
  const { id, onHide, onBeforeShow } = props;

  const currentCtx = useProviderCurrentContext();
  const internalStateRef = React.useRef<InternalState>({
    visible: false,
    onHide,
    onBeforeShow,
  });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    internalStateRef.current.visible = visible;
    internalStateRef.current.onHide = onHide;
    internalStateRef.current.onBeforeShow = onBeforeShow;
  });

  React.useEffect(() => {
    const internalState = internalStateRef.current;

    const subscriptions = [
      EventManager.onShowSheet(id, (data, context) => {
        if (internalState.visible) {
          return;
        }

        if (context !== currentCtx) {
          return;
        }

        internalState.onBeforeShow?.(data, context);
        setVisible(true);
      }),
      EventManager.onHideSheet(id, (data, context) => {
        if (!internalState.visible) {
          return;
        }

        if (context !== currentCtx) {
          return;
        }

        internalState.onHide?.(data, context);
      }),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, [id, currentCtx]);

  return {
    visible,
    setVisible,
  };
}

export default useSheetState;
