import { act, renderHook } from 'test-utils';
import EventManager from '../../EventManager';
import { DEFAULT_CONTEXT_NAME } from '../../constants';
import useOnCloseSheet from '../../hooks/useOnCloseSheet';
import { PrivateSheetManager } from '../../SheetManager';

describe('useOnCloseSheet', () => {
  afterEach(() => {
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  it('should call the listener', () => {
    const payload = 'test payload';
    const handler = jest.fn();

    const { unmount } = renderHook(() => useOnCloseSheet('test', handler));

    act(() => {
      EventManager.closeSheet('test', payload, DEFAULT_CONTEXT_NAME);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(payload, DEFAULT_CONTEXT_NAME);

    unmount();
  });
});
