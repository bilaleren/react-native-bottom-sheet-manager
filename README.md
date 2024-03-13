# React Native Bottom Sheet Manager

A bottom sheet manager inspired by package [react-native-actions-sheet](https://github.com/ammarahm-ed/react-native-actions-sheet) and adapted to package [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet).

- [API](./API_README.md)
- [Installation](#installation)
- [Configuration](#configuration)

## Installation

```sh
yarn add react-native-bottom-sheet-manager
```

#### Dependencies

This library needs these dependencies to be installed in your project before you can use it:

```sh
yarn add react-native-reanimated react-native-gesture-handler
```

## Configuration

For more information on configuration, [see here](./CONFIGURATION_README.md).

## Usage

After completing the [configuration step](#configuration), let's start with a simple use case.

```ts
import { SheetManager } from 'react-native-bottom-sheet-manager';

SheetManager.show('my-sheet');
```
For more use cases, [see here](./example/src/sheets).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](./LICENSE)

### Built With ❤️

- [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)
- [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
