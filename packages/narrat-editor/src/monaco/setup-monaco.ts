import './setup-yaml';
import './setup-workers';
import * as monaco from 'monaco-editor';
import { narratMonarchLanguage } from './narrat-monarch';

monaco.languages.register({ id: 'narrat' });
monaco.languages.setMonarchTokensProvider(
  'narrat',
  narratMonarchLanguage as any,
);
