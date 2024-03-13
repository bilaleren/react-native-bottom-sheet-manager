import * as React from 'react';
import EventManager from '../EventManager';
import type { SheetID, SheetIds, SheetReturnValue } from '../types';

export type OnHideSheetListener<Id extends SheetIds> = (
  value: SheetReturnValue<Id>,
  context: string
) => void;

/**
 * Listen to the hiding event of the `BottomSheet` with an id.
 * @param id ID of the `BottomSheet`.
 * @param listener Listen to hiding event.
 */
function useOnHideSheet<Id extends SheetIds>(
  id: SheetID<Id>,
  listener: OnHideSheetListener<Id>
): void {
  React.useEffect(() => {
    const subscription = EventManager.onHideSheet(id, listener);
    return () => subscription.remove();
  }, [id, listener]);
}

export default useOnHideSheet;
