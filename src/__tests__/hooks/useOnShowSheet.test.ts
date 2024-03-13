import { act, renderHook } from 'test-utils';
import EventManager from '../../EventManager';
import { DEFAULT_CONTEXT_NAME } from '../../constants';
import useOnShowSheet from '../../hooks/useOnShowSheet';
import { PrivateSheetManager } from '../../SheetManager';

describe('useOnShowSheet', () => {
  afterEach(() => {
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  it('should call the listener', () => {
    const payload = 'test payload';
    const handler = jest.fn();

    const { unmount } = renderHook(() => useOnShowSheet('test', handler));

    act(() => {
      EventManager.showSheet('test', payload, DEFAULT_CONTEXT_NAME);
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(payload, DEFAULT_CONTEXT_NAME);

    unmount();
  });
});
