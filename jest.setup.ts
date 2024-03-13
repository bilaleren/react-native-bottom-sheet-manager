import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.doMock('react-native/Libraries/Components/Switch/Switch', () => {
  const React = require('react');
  const ReactNative = require('react-native');

  return {
    __esModule: true,
    default: (props: object) => React.createElement(ReactNative.View, props),
  };
});
