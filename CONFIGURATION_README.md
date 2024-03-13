# Configuration

### Directory structure

In the `src/sheets` directory, we create react components containing the sheets you want to use.

```text
src/
├── sheets/
│   ├── index.ts
│   ├── sheets.ts
│   ├── MySheet.tsx
├── App.tsx
└── index.js
```

#### File `src/sheets/MySheet.tsx`

```tsx
import * as React from 'react';
import { Text } from 'react-native';
import {
  BottomSheet,
  type SheetProps
} from 'react-native-bottom-sheet-manager';

const MySheet: React.FC<SheetProps<'my-sheet'>> = ({ id }) => (
  <BottomSheet id={id}>
    <BottomSheet.View>
      <Text>sheet: {id}</Text>
    </BottomSheet.View>
  </BottomSheet>
)

export default MySheet;
```

#### File `src/sheets/sheets.ts`

```ts
import {
  registerSheet,
  type SheetDefinition,
} from 'react-native-bottom-sheet-manager';

import MySheet from './MySheet';

registerSheet('my-sheet', MySheet);

declare module 'react-native-bottom-sheet-manager' {
  interface Sheets {
    'my-sheet': SheetDefinition;
  }
}

export {};
```

#### File `src/sheets/index.ts`

```ts
import './sheets';
```

#### File `src/App.tsx`

```tsx
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SheetManagerProvider } from 'react-native-bottom-sheet-manager';

import './sheets';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SheetManagerProvider>
        {/* insert other components */}
      </SheetManagerProvider>
    </GestureHandlerRootView>
  )
};

export default App;
```
