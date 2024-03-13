import { act, renderHook } from 'test-utils';
import EventManager from '../../EventManager';
import { DEFAULT_CONTEXT_NAME } from '../../constants';
import useOnHideSheet from '../../hooks/useOnHideSheet';
import { PrivateSheetManager } from '../../SheetManager';

describe('useOnHideSheet', () => {
  afterEach(() => {
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  it('should call the listener', () => {
    const payload = 'test payload';
    const handler = jest.fn();

    const { unmount } = renderHook(() => useOnHideSheet('test', handler));

    act(() => {
      EventManager.hideSheet('test', payload, DEFAULT_CONTEXT_NAME);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(payload, DEFAULT_CONTEXT_NAME);

    unmount();
  });
});
