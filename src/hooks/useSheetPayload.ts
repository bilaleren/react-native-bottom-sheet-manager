import * as React from 'react';
import useOnShowSheet, { type OnShowSheetListener } from './useOnShowSheet';
import type { SheetID, SheetIds, SheetPayload } from '../types';

/**
 * After the sheet is shown, get the payload of the sheet with id.
 * @param id ID of the `BottomSheet`.
 */
function useSheetPayload<Id extends SheetIds>(
  id: SheetID<Id>
): SheetPayload<Id> | null {
  const [payload, setPayload] = React.useState<SheetPayload<Id> | null>(null);

  const listener: OnShowSheetListener<Id> = React.useCallback(
    (sheetPayload) => {
      setPayload((prevPayload) => {
        if (prevPayload !== sheetPayload) {
          return sheetPayload;
        }

        return prevPayload;
      });
    },
    []
  );

  useOnShowSheet(id, listener);

  return payload;
}

export default useSheetPayload;
