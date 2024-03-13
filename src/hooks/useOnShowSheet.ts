import * as React from 'react';
import EventManager from '../EventManager';
import type { SheetID, SheetIds, SheetPayload } from '../types';

export type OnShowSheetListener<Id extends SheetIds> = (
  payload: SheetPayload<Id>,
  context: string
) => void;

/**
 * Listen to the showing event of the `BottomSheet` with an id.
 * @param id ID of the `BottomSheet`.
 * @param listener Listen to showing event.
 */
function useOnShowSheet<Id extends SheetIds>(
  id: SheetID<Id>,
  listener: OnShowSheetListener<Id>
): void {
  React.useEffect(() => {
    const subscription = EventManager.onShowSheet(id, listener);
    return () => subscription.remove();
  }, [id, listener]);
}

export default useOnShowSheet;
