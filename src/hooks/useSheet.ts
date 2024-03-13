import * as React from 'react';
import SheetManager from '../SheetManager';
import useOnShowSheet from './useOnShowSheet';
import { DEFAULT_CONTEXT_NAME } from '../constants';
import type { SheetID, SheetIds, BottomSheetInstance } from '../types';

/**
 * Get any opened sheet instance with id.
 * @param id ID of the `BottomSheet`.
 * @param context Provide `context` of the `SheetManagerProvider` where you want to get the sheet instance.
 */
function useSheet<Id extends SheetIds>(
  id: SheetID<Id>,
  context = DEFAULT_CONTEXT_NAME
): BottomSheetInstance<Id> | null {
  const [sheet, setSheet] = React.useState(() => SheetManager.get(id, context));

  const listener = React.useCallback(() => {
    setSheet((prevSheet) => {
      const newSheet = SheetManager.get(id, context);

      if (newSheet !== prevSheet) {
        return newSheet;
      }

      return prevSheet;
    });
  }, [id, context]);

  useOnShowSheet(id, listener);

  return sheet;
}

export default useSheet;
