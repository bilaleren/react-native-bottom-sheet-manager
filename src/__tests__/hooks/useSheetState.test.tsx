import * as React from 'react';
import { ProviderCurrentContext } from '../../Contexts';
import { DEFAULT_CONTEXT_NAME } from '../../constants';
import { act, renderHook } from 'test-utils';
import EventManager from '../../EventManager';
import useSheetState from '../../hooks/useSheetState';
import { PrivateSheetManager } from '../../SheetManager';

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ProviderCurrentContext.Provider value={DEFAULT_CONTEXT_NAME}>
    {children}
  </ProviderCurrentContext.Provider>
);

describe('useSheetState', () => {
  afterEach(() => {
    PrivateSheetManager.reset();
    EventManager.removeAllListeners();
  });

  it('listeners should work in the same contexts', () => {
    const handleHide = jest.fn();
    const handleBeforeShow = jest.fn();

    const { result, unmount } = renderHook(
      () =>
        useSheetState({
          id: 'test',
          onHide: handleHide,
          onBeforeShow: handleBeforeShow,
        }),
      {
        wrapper: Wrapper,
      }
    );

    expect(handleHide).not.toHaveBeenCalled();
    expect(handleBeforeShow).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);
    expect(typeof result.current.setVisible).toBe('function');

    act(() => {
      EventManager.showSheet('test', undefined, DEFAULT_CONTEXT_NAME);
    });

    expect(result.current.visible).toBe(true);
    expect(handleHide).not.toHaveBeenCalled();
    expect(handleBeforeShow).toHaveBeenCalledTimes(1);
    expect(handleBeforeShow).toHaveBeenCalledWith(
      undefined,
      DEFAULT_CONTEXT_NAME
    );

    act(() => {
      EventManager.hideSheet('test', undefined, DEFAULT_CONTEXT_NAME);
    });

    expect(result.current.visible).toBe(true);
    expect(handleHide).toHaveBeenCalledTimes(1);
    expect(handleHide).toHaveBeenCalledWith(undefined, DEFAULT_CONTEXT_NAME);

    unmount();
    handleHide.mockRestore();
    handleBeforeShow.mockRestore();

    act(() => {
      EventManager.showSheet('test', undefined, DEFAULT_CONTEXT_NAME);
      EventManager.hideSheet('test', undefined, DEFAULT_CONTEXT_NAME);
    });

    expect(handleHide).not.toHaveBeenCalled();
    expect(handleBeforeShow).not.toHaveBeenCalled();
  });

  it('listeners should not work in different contexts', () => {
    const DIFFERENT_CONTEXT_NAME = '__DIFFERENT__';

    const handleHide = jest.fn();
    const handleBeforeShow = jest.fn();

    const { result, unmount } = renderHook(
      () =>
        useSheetState({
          id: 'test',
          onHide: handleHide,
          onBeforeShow: handleBeforeShow,
        }),
      {
        wrapper: Wrapper,
      }
    );

    expect(handleHide).not.toHaveBeenCalled();
    expect(handleBeforeShow).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);
    expect(typeof result.current.setVisible).toBe('function');

    act(() => {
      EventManager.showSheet('test', undefined, DIFFERENT_CONTEXT_NAME);
    });

    expect(handleHide).not.toHaveBeenCalled();
    expect(handleBeforeShow).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);

    act(() => {
      EventManager.hideSheet('test', undefined, DIFFERENT_CONTEXT_NAME);
    });

    expect(handleHide).not.toHaveBeenCalled();
    expect(handleBeforeShow).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);

    act(() => {
      EventManager.showSheet('test', undefined, DIFFERENT_CONTEXT_NAME);
      EventManager.hideSheet('test', undefined, DIFFERENT_CONTEXT_NAME);
    });

    expect(handleHide).not.toHaveBeenCalled();
    expect(handleBeforeShow).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);

    unmount();
  });
});
