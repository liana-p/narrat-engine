import { DialogChoice } from '@/stores/dialog-store';

export interface DialogBoxParameters {
  title: string;
  text: string;
  styleId: string;
  cssClass?: string;
  choices: DialogChoice[];
  textField?: boolean;
  old: boolean;
  interactive: boolean;
}
