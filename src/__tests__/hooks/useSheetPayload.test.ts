import { act, renderHook } from 'test-utils';
import EventManager from '../../EventManager';
import { PrivateSheetManager } from '../../SheetManager';
import useSheetPayload from '../../hooks/useSheetPayload';
import { DEFAULT_CONTEXT_NAME } from '../../constants';

describe('useSheetPayload', () => {
  afterEach(() => {
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  it('should return null', () => {
    const { result, unmount } = renderHook(() => useSheetPayload('test'));

    expect(result.current).toBeNull();

    unmount();
  });

  it('should return "provided payload"', () => {
    const payload = 'provided payload';
    const { result, unmount } = renderHook(() => useSheetPayload('test'));

    expect(result.current).toBeNull();

    act(() => {
      EventManager.showSheet('test', payload, DEFAULT_CONTEXT_NAME);
    });

    expect(result.current).toBe(payload);

    unmount();
  });
});
