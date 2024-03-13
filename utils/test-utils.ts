import * as React from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import type { BottomSheetInstance } from 'react-native-bottom-sheet-manager';

type Props = Record<string, unknown>;

declare module '../src/types' {
  interface Sheets {
    'test': import('../src/types').SheetDefinition<any, any>;
    'test-1': import('../src/types').SheetDefinition<any, any>;
    'test-2': import('../src/types').SheetDefinition<any, any>;
  }
}

export const createMockBottomSheetInstance = (): BottomSheetInstance => ({
  close: jest.fn(),
  expand: jest.fn(),
  collapse: jest.fn(),
  snapToIndex: jest.fn(),
  snapToPosition: jest.fn(),
});

export {
  waitFor,
  render,
  renderHook,
  act,
  userEvent,
} from '@testing-library/react-native';

type CreateTestRendererResult = ReturnType<typeof render> & {
  updateProps(props: Props): void;
};

export function createTestRenderer(
  element: React.ReactElement,
  options?: RenderOptions
): CreateTestRendererResult {
  const { update, ...rendererResult } = render(element, options);

  const updateProps: CreateTestRendererResult['updateProps'] = (props) => {
    update(
      React.cloneElement(element, {
        ...element.props,
        ...props,
      })
    );
  };

  return {
    ...rendererResult,
    update,
    updateProps,
  };
}
