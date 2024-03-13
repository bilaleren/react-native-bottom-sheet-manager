import RNEventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import type { EmitterSubscription } from 'react-native';

const EventEmitter = new RNEventEmitter();

const EventTypes = {
  showSheet: (id: string) => `showSheet:${id}`,
  hideSheet: (id: string) => `hideSheet:${id}`,
  closeSheet: (id: string) => `closeSheet:${id}`,
  showSheetWrapper: (id: string) => `showSheetWrapper:${id}`,
  hideSheetWrapper: (id: string) => `hideSheetWrapper:${id}`,
  registerSheet: (context: string) => `registerSheet:${context}`,
} as const;

const EventManager = {
  // Emitters
  showSheet(id: string, payload: any, context: string): void {
    EventEmitter.emit(EventTypes.showSheet(id), payload, context);
  },
  hideSheet(id: string, payload: any, context: string): void {
    EventEmitter.emit(EventTypes.hideSheet(id), payload, context);
  },
  closeSheet(id: string, payload: any, context: string): void {
    EventEmitter.emit(EventTypes.closeSheet(id), payload, context);
  },
  registerSheet(context: string): void {
    EventEmitter.emit(EventTypes.registerSheet(context), context);
  },
  showSheetWrapper(id: string, payload: any, context: string): void {
    EventEmitter.emit(EventTypes.showSheetWrapper(id), payload, context);
  },
  hideSheetWrapper(id: string, payload: any, context: string): void {
    EventEmitter.emit(EventTypes.hideSheetWrapper(id), payload, context);
  },

  // Listeners
  onShowSheet(
    id: string,
    listener: (data: any, context: string) => void
  ): EmitterSubscription {
    return EventEmitter.addListener(EventTypes.showSheet(id), listener);
  },
  onHideSheet(
    id: string,
    listener: (data: any, context: string) => void
  ): EmitterSubscription {
    return EventEmitter.addListener(EventTypes.hideSheet(id), listener);
  },
  onCloseSheet(
    id: string,
    listener: (data: any, context: string) => void
  ): EmitterSubscription {
    return EventEmitter.addListener(EventTypes.closeSheet(id), listener);
  },
  onRegisterSheet(
    context: string,
    listener: (context: string) => void
  ): EmitterSubscription {
    return EventEmitter.addListener(
      EventTypes.registerSheet(context),
      listener
    );
  },
  onShowSheetWrapper(
    id: string,
    listener: (data: any, context: string) => void
  ): EmitterSubscription {
    return EventEmitter.addListener(EventTypes.showSheetWrapper(id), listener);
  },
  onHideSheetWrapper(
    id: string,
    listener: (data: any, context: string) => void
  ): EmitterSubscription {
    return EventEmitter.addListener(EventTypes.hideSheetWrapper(id), listener);
  },

  // Other
  removeAllListeners(id?: string): void {
    if (id) {
      const eventTypes: readonly string[] = [
        EventTypes.showSheet(id),
        EventTypes.hideSheet(id),
        EventTypes.closeSheet(id),
        EventTypes.showSheetWrapper(id),
        EventTypes.hideSheetWrapper(id),
      ];

      for (const eventType of eventTypes) {
        EventEmitter.removeAllListeners(eventType);
      }
    } else {
      EventEmitter.removeAllListeners();
    }
  },
} as const;

export default EventManager;
