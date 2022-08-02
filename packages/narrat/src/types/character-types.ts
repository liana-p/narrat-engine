export interface CharactersConfigFile {
  config: {
    imagesPath: string;
  };
  characters: {
    [key: string]: CharacterData;
  };
}

export interface CharacterData {
  sprites?: {
    [key: string]: string;
  };
  name: string;
  style?: DialogStyle;
}

export interface DialogStyle {
  color?: string;
  boxCss?: {
    [key: string]: any;
  };
  nameCss?: {
    [key: string]: any;
  };
  textCss?: {
    [key: string]: any;
  };
}