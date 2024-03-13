import { act, renderHook } from 'test-utils';
import EventManager from '../../EventManager';
import { PrivateSheetManager } from '../../SheetManager';
import useSheetValue from '../../hooks/useSheetValue';
import { DEFAULT_CONTEXT_NAME } from '../../constants';

describe('useSheetValue', () => {
  afterEach(() => {
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  it('should return undefined', () => {
    const { result, unmount } = renderHook(() => useSheetValue('test'));

    expect(result.current).toBeUndefined();

    unmount();
  });

  it('should return "provided value"', () => {
    const value = 'provided value';
    const { result, unmount } = renderHook(() => useSheetValue('test'));

    expect(result.current).toBeUndefined();

    act(() => {
      EventManager.closeSheet('test', value, DEFAULT_CONTEXT_NAME);
    });

    expect(result.current).toBe(value);

    unmount();
  });
});
