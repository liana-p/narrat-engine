export enum SaveAction {
  Load = 'load',
  Delete = 'delete',
  Choose = 'choose',
}

export interface SaveActionData {
  id: string;
  text: string;
}
