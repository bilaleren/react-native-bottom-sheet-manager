import EventManager from '../EventManager';
import SheetManager, { PrivateSheetManager } from '../SheetManager';
import { DEFAULT_CONTEXT_NAME } from '../constants';
import { createMockBottomSheetInstance } from 'test-utils';

describe('SheetManager & PrivateSheetManager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  describe('show()', () => {
    it('without payload', () => {
      const listener = jest.fn();

      EventManager.onShowSheetWrapper('test', listener);

      SheetManager.show('test');

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
    });

    it('with payload', async () => {
      const payloadValue = 'payload';
      const handleCloseSheet = jest.fn();
      const handleShowSheetWrapper = jest.fn();

      EventManager.onCloseSheet('test', handleCloseSheet);
      EventManager.onShowSheetWrapper('test', handleShowSheetWrapper);

      const promise = SheetManager.show('test', {
        payload: payloadValue,
      });

      expect(handleShowSheetWrapper).toHaveBeenCalledTimes(1);
      expect(handleShowSheetWrapper).toHaveBeenCalledWith(
        payloadValue,
        DEFAULT_CONTEXT_NAME
      );

      EventManager.closeSheet('test', payloadValue, DEFAULT_CONTEXT_NAME);

      await expect(promise).resolves.toBe(payloadValue);

      expect(handleCloseSheet).toHaveBeenCalledTimes(1);
      expect(handleCloseSheet).toHaveBeenCalledWith(
        payloadValue,
        DEFAULT_CONTEXT_NAME
      );
    });
  });

  describe('hide()', () => {
    it('without value', () => {
      const listener = jest.fn();

      EventManager.onHideSheetWrapper('test', listener);

      SheetManager.hide('test');

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
    });

    it('with value', async () => {
      const value = 'test value';
      const handleCloseSheet = jest.fn();
      const handleHideSheetWrapper = jest.fn();
      const handleUnregisterInstance = jest.spyOn(
        PrivateSheetManager,
        'unregisterInstance'
      );

      EventManager.onCloseSheet('test', handleCloseSheet);
      EventManager.onHideSheetWrapper('test', handleHideSheetWrapper);

      const promise = SheetManager.hide('test', {
        value,
      });

      expect(handleHideSheetWrapper).toHaveBeenCalledTimes(1);
      expect(handleHideSheetWrapper).toHaveBeenCalledWith(
        value,
        DEFAULT_CONTEXT_NAME
      );

      EventManager.closeSheet('test', value, DEFAULT_CONTEXT_NAME);

      await expect(promise).resolves.toBe(value);

      expect(handleCloseSheet).toHaveBeenCalledTimes(1);
      expect(handleCloseSheet).toHaveBeenCalledWith(
        value,
        DEFAULT_CONTEXT_NAME
      );

      expect(handleUnregisterInstance).toHaveBeenCalledTimes(1);
      expect(handleUnregisterInstance).toHaveBeenCalledWith(
        'test',
        DEFAULT_CONTEXT_NAME
      );
    });
  });

  it('hideAll()', () => {
    const listeners = {
      'test': jest.fn(),
      'test-2': jest.fn(),
    };

    for (const id in listeners) {
      const listener = listeners[id as keyof typeof listeners];

      PrivateSheetManager.registerInstance(
        id,
        DEFAULT_CONTEXT_NAME,
        createMockBottomSheetInstance()
      );

      EventManager.onHideSheet(id, listener);
    }

    SheetManager.hideAll();

    for (const id in listeners) {
      const listener = listeners[id as keyof typeof listeners];

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);
    }
  });

  it('get()', () => {
    const instance = createMockBottomSheetInstance();

    PrivateSheetManager.registerInstance(
      'test',
      DEFAULT_CONTEXT_NAME,
      instance
    );

    expect(instance === SheetManager.get('test', DEFAULT_CONTEXT_NAME)).toBe(
      true
    );
  });

  describe('PrivateSheetManager', () => {
    it('registerSheet()', () => {
      const TestSheet = () => null;
      const listener = jest.fn();

      EventManager.onRegisterSheet(DEFAULT_CONTEXT_NAME, listener);
      PrivateSheetManager.registerSheet('test', TestSheet);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(DEFAULT_CONTEXT_NAME);
      expect(
        TestSheet === PrivateSheetManager.getSheet('test', DEFAULT_CONTEXT_NAME)
      ).toBe(true);
    });

    it('unregisterSheet()', () => {
      const TestSheet = () => null;
      const listener = jest.fn();

      EventManager.onRegisterSheet(DEFAULT_CONTEXT_NAME, listener);
      PrivateSheetManager.registerSheet('test', TestSheet);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(DEFAULT_CONTEXT_NAME);
      expect(
        TestSheet === PrivateSheetManager.getSheet('test', DEFAULT_CONTEXT_NAME)
      ).toBe(true);

      PrivateSheetManager.unregisterSheet('test');

      expect(
        PrivateSheetManager.getSheet('test', DEFAULT_CONTEXT_NAME)
      ).toBeNull();
    });

    it('registerContext()', () => {
      PrivateSheetManager.registerContext(DEFAULT_CONTEXT_NAME);

      expect(PrivateSheetManager.getContexts()).toStrictEqual([
        DEFAULT_CONTEXT_NAME,
      ]);
    });

    it('unregisterContext()', () => {
      PrivateSheetManager.registerContext(DEFAULT_CONTEXT_NAME);

      expect(PrivateSheetManager.getContexts()).toStrictEqual([
        DEFAULT_CONTEXT_NAME,
      ]);

      PrivateSheetManager.unregisterContext(DEFAULT_CONTEXT_NAME);

      expect(PrivateSheetManager.getContexts()).toStrictEqual([]);
    });

    it('getSheet()', () => {
      const TestSheet = () => null;

      PrivateSheetManager.registerSheet('test', TestSheet);

      expect(
        TestSheet === PrivateSheetManager.getSheet('test', DEFAULT_CONTEXT_NAME)
      ).toBe(true);
    });

    it('getRegistry()', () => {
      const TestSheet = () => null;

      PrivateSheetManager.registerSheet('test', TestSheet);

      const registry = PrivateSheetManager.getRegistry(DEFAULT_CONTEXT_NAME);
      const sheetRegistry = PrivateSheetManager.getSheetRegistry();

      expect(registry === sheetRegistry[DEFAULT_CONTEXT_NAME]).toBe(true);
    });

    it('registerInstance()', () => {
      const instance = createMockBottomSheetInstance();

      PrivateSheetManager.registerInstance(
        'test',
        DEFAULT_CONTEXT_NAME,
        instance
      );

      expect(instance === SheetManager.get('test', DEFAULT_CONTEXT_NAME)).toBe(
        true
      );

      expect(PrivateSheetManager.getKeys()).toStrictEqual([
        PrivateSheetManager.makeKey('test', DEFAULT_CONTEXT_NAME),
      ]);
    });

    it('unregisterInstance()', () => {
      const instance = createMockBottomSheetInstance();

      PrivateSheetManager.registerInstance(
        'test',
        DEFAULT_CONTEXT_NAME,
        instance
      );

      expect(instance === SheetManager.get('test', DEFAULT_CONTEXT_NAME)).toBe(
        true
      );

      expect(PrivateSheetManager.getKeys()).toStrictEqual([
        PrivateSheetManager.makeKey('test', DEFAULT_CONTEXT_NAME),
      ]);

      PrivateSheetManager.unregisterInstance('test', DEFAULT_CONTEXT_NAME);

      expect(instance === SheetManager.get('test', DEFAULT_CONTEXT_NAME)).toBe(
        false
      );

      expect(PrivateSheetManager.getKeys()).toStrictEqual([
        PrivateSheetManager.makeKey('test', DEFAULT_CONTEXT_NAME),
      ]);
    });
  });
});
