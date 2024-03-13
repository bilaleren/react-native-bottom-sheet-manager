import * as React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import {
  SheetManager,
  SheetManagerProvider,
} from 'react-native-bottom-sheet-manager';
import { Button } from './components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const sheetExamples = [
  {
    title: 'Show Basic Sheet',
    onPress: () => {
      SheetManager.show('basic');
    },
  },
  {
    title: 'Show Input Sheet',
    onPress: () => {
      SheetManager.show('input').then((value) => {
        if (value) {
          Alert.alert('Input Sheet', `value: ${value}`);
        }
      });
    },
  },
  {
    title: 'Show Modal Sheet',
    onPress: () => {
      SheetManager.show('modal');
    },
  },
  {
    title: 'Show Backdrop With Sheet',
    onPress: () => {
      SheetManager.show('backdrop');
    },
  },
  {
    title: 'Show Footer With Sheet',
    onPress: () => {
      SheetManager.show('footer');
    },
  },
];

const App: React.FC = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {sheetExamples.map((sheetExample) => (
            <Button
              key={sheetExample.title}
              title={sheetExample.title}
              style={styles.button}
              onPress={sheetExample.onPress}
            />
          ))}
        </ScrollView>
        <SheetManagerProvider />
      </SafeAreaView>
    </GestureHandlerRootView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f3f3',
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default App;
