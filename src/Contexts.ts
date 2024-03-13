import * as React from 'react';
import { DEFAULT_CONTEXT_NAME } from './constants';
import type { BottomSheetInstance } from './types';

export const ProviderCurrentContext = React.createContext(DEFAULT_CONTEXT_NAME);

export const CurrentSheetInstanceContext = React.createContext<
  React.MutableRefObject<BottomSheetInstance | null>
>({
  current: null,
});

export function useCurrentSheetInstance(): React.MutableRefObject<BottomSheetInstance | null> {
  const ref = React.useContext(CurrentSheetInstanceContext);

  if (!ref) {
    throw new Error(
      `"${useCurrentSheetInstance.name}" hook is not wrapped with "CurrentSheetInstanceContext.Provider".`
    );
  }

  return ref;
}

export function useProviderCurrentContext(): string {
  return React.useContext(ProviderCurrentContext);
}
