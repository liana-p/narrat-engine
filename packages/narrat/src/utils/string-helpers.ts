import { findDataHelper, getModifiableDataPinia } from './data-helpers';

export function processText(text: string): string {
  return text.replace(/%{[^}]*}/g, (match) => {
    const key = match.substr(2, match.length - 3);
    const searchableState = getModifiableDataPinia();
    const [obj, newKey] = findDataHelper<any>(searchableState, key);

    return obj[newKey];
  });
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
