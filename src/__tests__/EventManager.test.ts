import EventManager from '../EventManager';
import { DEFAULT_CONTEXT_NAME } from '../constants';

describe('EventManager', () => {
  afterEach(() => {
    EventManager.removeAllListeners();
  });

  it('showSheet()', () => {
    const listener = jest.fn();

    EventManager.onShowSheet('test', listener);
    EventManager.showSheet('test', undefined, DEFAULT_CONTEXT_NAME);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
  });

  it('hideSheet()', () => {
    const listener = jest.fn();

    EventManager.onHideSheet('test', listener);
    EventManager.hideSheet('test', undefined, DEFAULT_CONTEXT_NAME);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
  });

  it('closeSheet()', () => {
    const listener = jest.fn();

    EventManager.onCloseSheet('test', listener);
    EventManager.closeSheet('test', undefined, DEFAULT_CONTEXT_NAME);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
  });

  it('registerSheet()', () => {
    const listener = jest.fn();

    EventManager.onRegisterSheet(DEFAULT_CONTEXT_NAME, listener);
    EventManager.registerSheet(DEFAULT_CONTEXT_NAME);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(DEFAULT_CONTEXT_NAME);
  });

  it('showSheetWrapper()', () => {
    const listener = jest.fn();

    EventManager.onShowSheetWrapper('test', listener);
    EventManager.showSheetWrapper('test', undefined, DEFAULT_CONTEXT_NAME);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
  });

  it('hideSheetWrapper()', () => {
    const listener = jest.fn();

    EventManager.onHideSheetWrapper('test', listener);
    EventManager.hideSheetWrapper('test', undefined, DEFAULT_CONTEXT_NAME);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
  });

  it('removeAllListeners()', () => {
    const listener = jest.fn();
    const registerSheetListener = jest.fn();

    const emit = (): void => {
      EventManager.showSheet('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.hideSheet('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.closeSheet('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.showSheetWrapper('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.hideSheetWrapper('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.registerSheet(DEFAULT_CONTEXT_NAME);
    };

    EventManager.onShowSheet('test', listener);
    EventManager.onHideSheet('test', listener);
    EventManager.onCloseSheet('test', listener);
    EventManager.onShowSheetWrapper('test', listener);
    EventManager.onHideSheetWrapper('test', listener);
    EventManager.onRegisterSheet(DEFAULT_CONTEXT_NAME, registerSheetListener);

    emit();

    expect(listener).toHaveBeenCalledTimes(5);
    expect(registerSheetListener).toHaveBeenCalledTimes(1);

    for (let i = 1; i <= 5; i++) {
      expect(listener).toHaveBeenNthCalledWith(
        i,
        undefined,
        DEFAULT_CONTEXT_NAME
      );
    }

    expect(registerSheetListener).toHaveBeenCalledWith(DEFAULT_CONTEXT_NAME);

    listener.mockRestore();
    registerSheetListener.mockRestore();
    EventManager.removeAllListeners();

    emit();

    expect(listener).toHaveBeenCalledTimes(0);
    expect(registerSheetListener).toHaveBeenCalledTimes(0);
  });

  it('removeAllListeners(id)', () => {
    const listener = jest.fn();

    const emit = (): void => {
      EventManager.showSheet('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.hideSheet('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.closeSheet('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.showSheetWrapper('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.hideSheetWrapper('test', undefined, DEFAULT_CONTEXT_NAME);
    };

    EventManager.onShowSheet('test', listener);
    EventManager.onHideSheet('test', listener);
    EventManager.onCloseSheet('test', listener);
    EventManager.onShowSheetWrapper('test', listener);
    EventManager.onHideSheetWrapper('test', listener);

    emit();

    expect(listener).toHaveBeenCalledTimes(5);

    for (let i = 1; i <= 5; i++) {
      expect(listener).toHaveBeenNthCalledWith(
        i,
        undefined,
        DEFAULT_CONTEXT_NAME
      );
    }

    listener.mockRestore();
    EventManager.removeAllListeners('test');

    emit();

    expect(listener).toHaveBeenCalledTimes(0);
  });
});
