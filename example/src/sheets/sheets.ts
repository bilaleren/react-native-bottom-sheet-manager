import {
  registerSheet,
  type SheetDefinition,
} from 'react-native-bottom-sheet-manager';

import BasicSheet from './BasicSheet';
import InputSheet from './InputSheet';
import ModalSheet from './ModalSheet';
import FooterSheet from './FooterSheet';
import BackdropSheet from './BackdropSheet';

registerSheet('basic', BasicSheet);
registerSheet('input', InputSheet);
registerSheet('modal', ModalSheet);
registerSheet('footer', FooterSheet);
registerSheet('backdrop', BackdropSheet);

declare module 'react-native-bottom-sheet-manager' {
  interface Sheets {
    basic: SheetDefinition;
    modal: SheetDefinition;
    input: SheetDefinition<never, string>;
    footer: SheetDefinition;
    backdrop: SheetDefinition;
  }
}

export {};
