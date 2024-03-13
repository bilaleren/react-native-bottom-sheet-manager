import * as React from 'react';
import EventManager from './EventManager';
import { DEFAULT_CONTEXT_NAME } from './constants';
import type {
  SheetID,
  SheetIds,
  SheetProps,
  SheetPayload,
  SheetReturnValue,
  BottomSheetInstance,
} from './types';

let keys: string[] = [];
let contexts: string[] = [];
let instances: Record<string, BottomSheetInstance> = {};
let sheetRegistry: Record<
  string,
  Record<string, React.ComponentType<SheetProps>>
> = {
  [DEFAULT_CONTEXT_NAME]: {},
};

const DEFAULT_Z_INDEX = 999;

const makeKey = (id: string, context: string) => `${id}.${context}`;

/**
 * Show the `BottomSheet` with an id.
 * @param id Id of the `BottomSheet to show.
 * @param args
 */
function show<Id extends SheetIds>(
  id: SheetID<Id>,
  ...args: SheetPayload<Id> extends never
    ? [
        options?: {
          /**
           * Provide `context` of the `SheetManagerProvider` where you want to show the bottom sheet.
           */
          context?: string;
        },
      ]
    : [
        options: {
          /**
           * Any data to pass to the `BottomSheet`.
           */
          payload: SheetPayload<Id>;

          /**
           * Provide `context` of the `SheetManagerProvider` where you want to show the bottom sheet.
           */
          context?: string;
        },
      ]
): Promise<SheetReturnValue<Id> | undefined>;
function show(...args: any[]) {
  const [id, options = {}] = args;
  const { payload, context: providedContext = DEFAULT_CONTEXT_NAME } = options;

  return new Promise((resolve) => {
    const subscription = EventManager.onCloseSheet(id, (data, context) => {
      if (context !== providedContext) {
        return;
      }

      subscription.remove();
      resolve(data);
    });

    EventManager.showSheetWrapper(id, payload, providedContext);
  });
}

/**
 * Hide the `BottomSheet` with an id.
 * @param id Id of the `BottomSheet to hide.
 * @param args
 */
function hide<Id extends SheetIds>(
  id: SheetID<Id>,
  ...args: SheetReturnValue<Id> extends never
    ? [
        options?: {
          /**
           * Provide `context` of the `SheetManagerProvider` where you want to hide the bottom sheet.
           */
          context?: string;
        },
      ]
    : [
        options: {
          /**
           * Return some data to the caller on closing the `BottomSheet`.
           */
          value: SheetReturnValue<Id>;

          /**
           * Provide `context` of the `SheetManagerProvider` where you want to hide the bottom sheet.
           */
          context?: string;
        },
      ]
): Promise<SheetReturnValue<Id> | undefined>;
function hide(...args: any[]) {
  const [id, options = {}] = args;
  const { value, context: providedContext = DEFAULT_CONTEXT_NAME } = options;

  return new Promise((resolve) => {
    const subscription = EventManager.onCloseSheet(id, (data, context) => {
      if (context !== providedContext) {
        return;
      }

      subscription.remove();
      PrivateSheetManager.unregisterInstance(id, context);
      resolve(data);
    });

    EventManager.hideSheetWrapper(id, value, providedContext);
  });
}

function getSheet(
  id: string,
  context: string
): React.ComponentType<SheetProps> | null {
  const registry = getRegistry(context);
  const sheet = registry[id];

  return sheet || null;
}

function getRegistry(
  context: string
): Record<string, React.ComponentType<SheetProps>> {
  return sheetRegistry[context] || {};
}

export function registerSheet<Id extends SheetIds>(
  id: SheetID<Id>,
  sheet: React.ComponentType<SheetProps<Id>>,
  context = DEFAULT_CONTEXT_NAME
): void {
  if (!sheetRegistry[context]) {
    sheetRegistry[context] = {};
  }

  sheetRegistry[context]![id] = sheet as React.ComponentType<SheetProps>;

  EventManager.registerSheet(context);
}

export function unregisterSheet<Id extends SheetIds>(
  id: SheetID<Id>,
  context = DEFAULT_CONTEXT_NAME
): void {
  if (sheetRegistry[context] && sheetRegistry[context]![id]) {
    delete sheetRegistry[context]![id];
    EventManager.removeAllListeners(id);
  }
}

function getSheetContext(id: string, context?: string): string | null {
  if (context) {
    return context;
  }

  for (const ctx of contexts) {
    for (const sheetId in sheetRegistry[ctx]) {
      if (id === sheetId) {
        return ctx;
      }
    }
  }

  return null;
}

const SheetManager = {
  show,
  hide,
  /**
   * Get any opened sheet instance with id.
   * @param id ID of the `BottomSheet`.
   * @param context Provide `context` of the `SheetManagerProvider` where you want to get the sheet instance.
   */
  get<Id extends SheetIds>(
    id: SheetID<Id>,
    context?: string
  ): BottomSheetInstance<Id> | null {
    const sheetContext = getSheetContext(id, context);

    if (!sheetContext) {
      return null;
    }

    const key = makeKey(id, sheetContext);

    return instances[key] || null;
  },
  /**
   * Hide all the opened BottomSheets.
   */
  hideAll(): void {
    for (const key of keys) {
      const [id, context] = key.split('.');

      if (id && context) {
        EventManager.hideSheet(id, undefined, context);
      }
    }
  },
} as const;

export const PrivateSheetManager = {
  reset(): void {
    keys = [];
    contexts = [];
    instances = {};
    sheetRegistry = {
      [DEFAULT_CONTEXT_NAME]: {},
    };
    EventManager.removeAllListeners();
  },
  registerSheet,
  unregisterSheet,
  registerContext(context: string): void {
    if (contexts.indexOf(context) === -1) {
      contexts.push(context);
    }
  },
  unregisterContext(context: string): void {
    const index = contexts.indexOf(context);

    if (index > -1) {
      contexts.splice(index, 1);
    }
  },
  registerInstance(
    id: string,
    context: string,
    instance: BottomSheetInstance
  ): void {
    const key = makeKey(id, context);

    instances[key] = instance;

    if (keys.indexOf(key) === -1) {
      keys.push(key);
    }
  },
  unregisterInstance(id: string, context: string): void {
    const key = makeKey(id, context);

    delete instances[key];
  },

  makeKey,
  getKeys(): string[] {
    return keys;
  },
  getContexts(): string[] {
    return contexts;
  },
  getInstances(): Record<string, BottomSheetInstance> {
    return instances;
  },
  getSheetRegistry(): Record<
    string,
    Record<string, React.ComponentType<SheetProps>>
  > {
    return sheetRegistry;
  },
  getSheet,
  getRegistry,
  getSheetZIndex(id: string, context: string): number {
    const key = makeKey(id, context);
    const index = keys.indexOf(key);

    if (index > -1) {
      return DEFAULT_Z_INDEX + index + 1;
    }

    return DEFAULT_Z_INDEX;
  },
} as const;

export default SheetManager;
