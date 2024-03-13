import useSheet from '../../hooks/useSheet';
import EventManager from '../../EventManager';
import { PrivateSheetManager } from '../../SheetManager';
import { DEFAULT_CONTEXT_NAME } from '../../constants';
import { renderHook, createMockBottomSheetInstance } from 'test-utils';

describe('useSheet', () => {
  afterEach(() => {
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  it('should return null', () => {
    const { result, unmount } = renderHook(() => useSheet('test'));

    expect(result.current).toBeNull();

    unmount();
  });

  it('should return sheet', () => {
    const instance = createMockBottomSheetInstance();

    PrivateSheetManager.registerInstance(
      'test',
      DEFAULT_CONTEXT_NAME,
      instance
    );

    const { result, unmount } = renderHook(() => useSheet('test'));

    expect(instance === result.current).toBe(true);

    unmount();
  });
});
