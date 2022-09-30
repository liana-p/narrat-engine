import { findDataHelper, getModifiableDataPinia } from './data-helpers';
import { processTooltipsInText } from './tooltip-utils';

export function processText(text: string): string {
  const res = text.replace(/%{[^}]*}/g, (match) => {
    const key = match.substr(2, match.length - 3);
    return findVariable(key);
  });
  return processTooltipsInText(res);
}

export function findVariable(text: string) {
  const searchableState = getModifiableDataPinia();
  const [obj, newKey] = findDataHelper<any>(searchableState, text);

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
