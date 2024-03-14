# API

- [BottomSheet](#bottomsheet)
- [SheetManager](#sheetmanager)
  - [show](#sheetmanagershow)
  - [hide](#sheetmanagerhide)
  - [close](#sheetmanagerclose)
  - [get](#sheetmanagerget)
  - [hideAll](#sheetmanagerhideall)
- [Hooks](#hooks)
  - [useSheet](#useSheet)
  - [useSheetPayload](#usesheetpayload)
  - [useSheetValue](#usesheetvalue)
  - [useOnShowSheet](#useonshowsheet)
  - [useOnHideSheet](#useonhidesheet)
  - [useOnCloseSheet](#useonclosesheet)

## BottomSheet

For more information about the `BottomSheet` component and an example of its use, [see here](https://ui.gorhom.dev/components/bottom-sheet/usage).

Some components that can be used with `BottomSheet`:

- <BottomSheet.View />
- <BottomSheet.ScrollView />
- <BottomSheet.FlatList />
- <BottomSheet.SectionList />
- <BottomSheet.VirtualizedList />
- <BottomSheet.Handle />
- <BottomSheet.Footer />
- <BottomSheet.FooterContainer />
- <BottomSheet.Backdrop />
- <BottomSheet.TextInput />

## SheetManager

### `SheetManager.show()`

Show the `BottomSheet` with an id.

#### Params

| Name    | Type   | Required | Description                            |
|---------|--------|----------|----------------------------------------|
| id      | string | true     | Id of the `BottomSheet to show.        |
| options | object | false    | Options to use when showing the sheet. |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import { SheetManager } from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  return (
    <Button
      title="Show sheet"
      onPress={() =>
        SheetManager.show('my-sheet', {
          payload: 'any payload',
          context: 'custom-context',
        })
      }
    />
  );
};

export default App;
```

### `SheetManager.hide()`

Hide the `BottomSheet` with an id.

#### Params

| Name    | Type   | Required | Description                           |
|---------|--------|----------|---------------------------------------|
| id      | string | true     | Id of the `BottomSheet to hide.       |
| options | object | false    | Options to use when hiding the sheet. |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import { SheetManager } from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  return (
    <Button
      title="Hide sheet"
      onPress={() =>
        SheetManager.show('my-sheet', {
          value: 'any value',
          context: 'custom-context',
        })
      }
    />
  );
};

export default App;
```

### `SheetManager.close()`

Close the `BottomSheet` with an id.

#### Params

| Name    | Type   | Required | Description                                                                               |
|---------|--------|----------|-------------------------------------------------------------------------------------------|
| id      | string | true     | Id of the `BottomSheet to close.                                                          |
| context | string | false    | Provide `context` of the `SheetManagerProvider` where you want to close the bottom sheet. |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import { SheetManager } from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  return (
    <Button
      title="Close sheet"
      onPress={() => SheetManager.close('my-sheet')}
    />
  );
};

export default App;
```

### `SheetManager.get()`

Get any opened sheet instance with id.

#### Params

| Name    | Type   | Required | Description                                                                               |
|---------|--------|----------|-------------------------------------------------------------------------------------------|
| id      | string | true     | ID of the `BottomSheet`.                                                                  |
| context | string | false    | Provide `context` of the `SheetManagerProvider` where you want to get the sheet instance. |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import { SheetManager } from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  return (
    <Button
      title="Log the sheet"
      onPress={() => {
        console.log('my sheet:', SheetManager.get('my-sheet'));
      }}
    />
  );
};

export default App;
```

### `SheetManager.hideAll()`

Hide all the opened BottomSheets.

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import { SheetManager } from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  return (
    <Button
      title="Hide all sheets"
      onPress={() => SheetManager.hideAll()}
    />
  );
};

export default App;
```

## Hooks

### `useSheet()`

Get any opened sheet instance with id.

#### Params

| Name     | Type   | Required | Description                                                                                |
|----------|--------|----------|--------------------------------------------------------------------------------------------|
| id       | string | true     | ID of the `BottomSheet`.                                                                   |
| context  | string | false    | Provide `context` of the `SheetManagerProvider` where you want to get the sheet instance.  |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import {
  useSheet,
  SheetManager,
} from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  const mySheet = useSheet('my-sheet');

  return (
    <Button
      title="Close sheet"
      onPress={() => mySheet?.close()}
    />
  );
};

export default App;
```

### `useSheetPayload()`

After the sheet is shown, get the payload of the sheet with id.

#### Params

| Name     | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | string | true     | ID of the `BottomSheet`. |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import {
  SheetManager,
  useSheetPayload,
} from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  const mySheetPayload = useSheetPayload('my-sheet');

  React.useEffect(() => {
    console.log('sheet payload:', mySheetPayload);
  }, [mySheetPayload]);

  return (
    <Button
      title="Show sheet"
      onPress={() =>
        SheetManager.show('my-sheet', {
          payload: 'any payload',
        })
      }
    />
  );
};

export default App;
```

### `useSheetValue()`

After the sheet is closed, get the value of the sheet with id.

#### Params

| Name     | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | string | true     | ID of the `BottomSheet`. |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import {
  SheetManager,
  useSheetValue,
} from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  const mySheetValue = useSheetValue('my-sheet');

  React.useEffect(() => {
    console.log('sheet value:', mySheetValue);
  }, [mySheetValue]);

  return (
    <Button
      title="Hide sheet"
      onPress={() =>
        SheetManager.hide('my-sheet', {
          value: 'any value',
        })
      }
    />
  );
};

export default App;
```

### `useOnShowSheet()`

Listen to the showing event of the `BottomSheet` with an id.

#### Params

| Name     | Type     | Required | Description              |
|----------|----------|----------|--------------------------|
| id       | string   | true     | ID of the `BottomSheet`. |
| listener | function | true     | Listen to showing event. |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import {
  SheetManager,
  useOnShowSheet,
} from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  useOnShowSheet('my-sheet', (payload, context) => {
    console.log('payload:', payload, 'context:', context);
  });

  return (
    <Button
      title="Show sheet"
      onPress={() =>
        SheetManager.show('my-sheet', {
          payload: 'any payload',
        })
      }
    />
  );
};

export default App;
```

### `useOnHideSheet()`

Listen to the hiding event of the `BottomSheet` with an id.

#### Params

| Name     | Type     | Required | Description                     |
|----------|----------|----------|---------------------------------|
| id       | string   | true     | ID of the `BottomSheet`.        |
| listener | function | true     | Listen to hiding event.         |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import {
  SheetManager,
  useOnHideSheet,
} from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  useOnHideSheet('my-sheet', (value, context) => {
    console.log('value:', value, 'context:', context);
  });

  return (
    <Button
      title="Hide sheet"
      onPress={() =>
        SheetManager.hide('my-sheet', {
          value: 'any value',
        })
      }
    />
  );
};

export default App;
```

### `useOnCloseSheet()`

Listen to the closing event of the `BottomSheet` with an id.

#### Params

| Name     | Type     | Required | Description                     |
|----------|----------|----------|---------------------------------|
| id       | string   | true     | ID of the `BottomSheet`.        |
| listener | function | true     | Listen to closing event.        |

#### Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native';
import {
  SheetManager,
  useOnCloseSheet,
} from 'react-native-bottom-sheet-manager';

const App: React.FC = () => {
  useOnCloseSheet('my-sheet', (value, context) => {
    console.log('value:', value, 'context:', context);
  });

  return (
    <Button
      title="Hide sheet"
      onPress={() =>
        SheetManager.hide('my-sheet', {
          value: 'any value',
        })
      }
    />
  );
};

export default App;
```

