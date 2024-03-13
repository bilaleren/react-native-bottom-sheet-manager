import * as React from 'react';
import useOnCloseSheet, { type OnCloseSheetListener } from './useOnCloseSheet';
import type { SheetID, SheetIds, SheetReturnValue } from '../types';

/**
 * After the sheet is closed, get the value of the sheet with id.
 * @param id ID of the `BottomSheet`.
 */
function useSheetValue<Id extends SheetIds>(
  id: SheetID<Id>
): SheetReturnValue<Id> | undefined {
  const [value, setValue] = React.useState<SheetReturnValue<Id>>();

  const listener: OnCloseSheetListener<Id> = React.useCallback((sheetValue) => {
    setValue((prevValue) => {
      if (prevValue !== sheetValue) {
        return sheetValue;
      }

      return prevValue;
    });
  }, []);

  useOnCloseSheet(id, listener);

  return value;
}

export default useSheetValue;
