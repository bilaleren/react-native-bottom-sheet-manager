import * as React from 'react';

function useForceUpdate(): React.DispatchWithoutAction {
  const reducer: React.ReducerWithoutAction<number> = React.useCallback(
    (prevState) => prevState + 1,
    []
  );
  const [, action] = React.useReducer(reducer, 0);

  return React.useCallback(() => action(), []);
}

export default useForceUpdate;
