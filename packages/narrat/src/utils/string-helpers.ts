import { findDataHelper, getModifiableDataPinia } from './data-helpers';
import { processTooltipsInText } from './tooltip-utils';
import i18next from 'i18next';

export function stringTemplater(
  sourceData: any,
  template: string,
  variablePrefix = '$',
) {
  return template.replace(/%{[^}]*}/g, (match) => {
    const key = match.substr(2, match.length - 3);
    return findVariable(sourceData, key, variablePrefix);
  });
}

export function processText(text: string): string {
  const searchableState = getModifiableDataPinia();
  // const res = stringTemplater(searchableState, text, '$');
  const translatedText = i18next.t(text, {
    ...searchableState.data,
    ...searchableState.scope,
  });
  return processTooltipsInText(translatedText as string);
}

export function findVariable(
  sourceObject: any,
  text: string,
  variablePrefix: string,
) {
  const [obj, newKey] = findDataHelper<any>(sourceObject, text, variablePrefix);

  return obj[newKey];
}

export const stringRegex = /\$\$"/;

export const isParsedTokenString = (arg: any): boolean => {
  if (typeof arg === 'string') {
    if (arg.search(stringRegex) === 0) {
      return true;
    }
  }
  return false;
};

export function findAllHtmlTags(txt: string) {
  let match: RegExpExecArray | null = null;
  const matches: RegExpExecArray[] = [];
  const regex = /<[^>]*>/g;
  do {
    match = regex.exec(txt);
    if (match) {
      matches.push(match);
    }
  } while (match);
  return matches;
}
