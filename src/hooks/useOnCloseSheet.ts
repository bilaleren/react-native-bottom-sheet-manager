import * as React from 'react';
import EventManager from '../EventManager';
import type { SheetID, SheetIds, SheetReturnValue } from '../types';

export type OnCloseSheetListener<Id extends SheetIds> = (
  value: SheetReturnValue<Id> | undefined,
  context: string
) => void;

/**
 * Listen to the closing event of the `BottomSheet` with an id.
 * @param id ID of the `BottomSheet`.
 * @param listener Listen to closing event.
 */
function useOnCloseSheet<Id extends SheetIds>(
  id: SheetID<Id>,
  listener: OnCloseSheetListener<Id>
): void {
  React.useEffect(() => {
    const subscription = EventManager.onCloseSheet(id, listener);
    return () => subscription.remove();
  }, [id, listener]);
}

export default useOnCloseSheet;
