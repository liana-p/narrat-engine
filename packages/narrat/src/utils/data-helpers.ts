import { getCommonConfig } from '@/config';
import { useHud } from '@/stores/hud-stats-store';
import { useInventory } from '@/stores/inventory-store';
import { useQuests } from '@/stores/quest-log';
import { useScreens } from '@/stores/screens-store';
import { useSkills } from '@/stores/skills';
import { useVM } from '@/stores/vm-store';
import { useMain } from '@/stores/main-store';
import { error } from './error-handling';
import { useSettings } from '@/stores/settings-store';

export function newFindDataHelper<T>(
  baseState: any,
  sourceObj: any,
  path: string,
  variablePrefix = '$',
): [T | null, string | number] {
  // console.log('find data helper ', path);
  if (!path.startsWith(variablePrefix)) {
    if (!isNaN(Number(path))) {
      return [null, Number(path)];
    }
    return [null, path];
  }
  path = path.substring(variablePrefix.length);
  const opening = /\[/;
  const closing = /\]/;
  let startIndex = path.search(opening);
  let endIndex = path.search(closing);
  let key: string | number = path;
  let obj: any = sourceObj;
  let currentIndex = 0;
  while (currentIndex < path.length) {
    if (currentIndex > 0) {
      // console.log(`we're looping`, obj, key);
      // console.log('current', currentIndex, 'start', startIndex);
    }
    if (startIndex > currentIndex || startIndex === -1) {
      // console.log(startIndex, currentIndex);
      const basePathEnd = startIndex > currentIndex ? startIndex : path.length;
      let basePathKey: string | number = path.substring(
        currentIndex,
        basePathEnd,
      );
      if (!isNaN(Number(basePathKey))) {
        basePathKey = Number(basePathKey);
      }
      if (currentIndex > 0) {
        // If we're about to look up a base path after the first iteration, get the final object first
        obj = obj[key];
      }
      // console.log('get path value', basePathKey, obj);
      [obj, key] = getPathValueWithoutBrackets(obj, basePathKey);
      // console.log('get paht value result', obj, key);
    }
    if (startIndex !== -1) {
      currentIndex = startIndex;
      const restOfString = path.substring(startIndex + 1);
      // console.log('rest of srting', restOfString);
      const bracketsEnd = findBracketsEnd(restOfString) + startIndex;
      const pathToSearch = path.substring(startIndex + 1, bracketsEnd);
      // console.log('path to search', pathToSearch);
      // Calculate the index to use for the next bit by processing the array brackets
      const [foundObj, foundKey] = newFindDataHelper(
        baseState,
        baseState,
        pathToSearch,
      );
      let newKey = foundKey;
      if (foundObj) {
        // We're getting the final value returned for that expression
        newKey = (foundObj as any)[foundKey];
      }
      // console.log(`new key from ${pathToSearch}`, newKey);
      if (typeof newKey === 'number' || !isNaN(Number(newKey))) {
        newKey = Number(newKey);
      } else if (typeof newKey !== 'string') {
        console.error(
          `invalid array index (${newKey}) key type when compiling: ${path}`,
        );
      }
      obj = obj[key];
      key = newKey;
      // console.log('obj, key', obj, key);
      currentIndex = bracketsEnd + 1;
      const afterBracket = path.substring(currentIndex);
      // console.log('after brackets', afterBracket);
      startIndex = afterBracket.search(opening);
      if (startIndex !== -1) {
        startIndex += currentIndex;
      }
      endIndex = afterBracket.search(closing);
      if (endIndex !== -1) {
        endIndex += currentIndex;
      }
      // console.log('startIndex', startIndex);
      // console.log('endIndex', endIndex);
    } else {
      // console.log('no more parenthesis, going to the end');
      currentIndex = path.length;
    }
  }

  return [obj, key];
}

export function findBracketsEnd(restOfString: string) {
  let finishedString = false;
  let index = 0;
  let stringToAnalyse;
  let openBrackets = 1;
  // Find the end of the closing brackets, ignoring nested brackets
  while (!finishedString) {
    stringToAnalyse = restOfString.substring(index);
    const opening = stringToAnalyse.search(/\[/);
    const closing = stringToAnalyse.search(/\]/);
    if (opening !== -1 && opening < closing) {
      index += opening + 1;
      openBrackets++;
    } else {
      index += closing + 1;
      openBrackets--;
    }
    if (openBrackets === 0) {
      finishedString = true;
    }
    if (opening === -1 && closing === -1 && !finishedString) {
      error(`Could not find closing bracket in ${restOfString}`);
    }
  }
  return index;
}

// This one works
export function getPathValueWithoutBrackets(
  sourceObj: any,
  path: string | number,
) {
  if (typeof path === 'number') {
    return [sourceObj, path];
  }
  if (path.startsWith('.')) {
    path = path.substring(1);
  }
  const keys = path.split('.');
  let obj = sourceObj;
  const end = keys.length - 1;
  let key: string | number = keys[0];
  let i = 0;
  for (i = 0; i < end; i++) {
    key = keys[i];
    if (typeof obj[key] === 'undefined') {
      obj[key] = {};
    }
    obj = obj[key];
  }
  key = keys[i];
  return [obj, key];
}
export function findDataHelper<T>(
  sourceObj: any,
  path: string,
  variablePrefix: string = '$',
): [T | null, string | number] {
  return newFindDataHelper(sourceObj, sourceObj, path);
  // const keys = path.split('.');
  // let obj = sourceObj;
  // const end = keys.length;
  // let key: string | number = keys[0];
  // let i = 0;
  // for (i = 0; i < end; i++) {
  //   if (i > 0) {
  //     obj = obj[key];
  //   }
  //   key = keys[i];
  //   [obj, key] = findArraysHelper(obj, key);
  // }
  // return [obj, key];
}

export function findDataHelperWithoutAutoCreate<T>(
  sourceObj: any,
  path: string,
): [T | null, string | number] | undefined {
  return findDataHelper(sourceObj, path);
  // const keys = path.split('.');
  // let obj = sourceObj;
  // const end = keys.length - 1;
  // let key = keys[0];
  // let i = 0;
  // for (i = 0; i < end; i++) {
  //   key = keys[i];
  //   if (!obj[key]) {
  //     obj[key] = {};
  //   }
  //   obj = obj[key];
  // }
  // key = keys[i];
  // if (typeof obj[key] === 'undefined') {
  //   obj[key] = null;
  // }
  // return [obj, key];
}

export function setDataHelper<T>(sourceObj: any, path: string, value: T) {
  const [obj, key] = findDataHelper<T>(sourceObj, path);
  (obj as any)[key] = value;
}

export function addDataHelper<T>(sourceObj: any, path: string, value: T) {
  const [obj, key] = findDataHelper<T>(sourceObj, path);
  const existingValue = (obj as any)[key] || 0;
  (obj as any)[key] = value + existingValue;
}

export function getModifiableDataPinia() {
  const vm = useVM();
  const skills = useSkills();
  const screens = useScreens();
  const inventory = useInventory();
  const scope = useVM().scope;
  const state = {
    data: vm.data,
    global: vm.globalData,
    skills: skills.skills,
    skillChecks: skills.skillChecks,
    buttons: screens.buttons,
    items: inventory.items,
    quests: useQuests().quests,
    stats: useHud().hudStats,
    scope,
    config: getCommonConfig(),
    gameOptions: useMain().options,
    baseSettings: useSettings().baseSettings,
    customSettings: useSettings().customSettings,
  };
  const proxy = new Proxy(state, {
    get: (target, prop, receiver) => {
      const scope = useVM().scope;
      const data = useVM().data;
      if (typeof scope[prop as any] !== 'undefined') {
        return scope[prop as any];
      }
      if (typeof data[prop as any] !== 'undefined') {
        return data[prop as any];
      }
      return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
      const scope = useVM().scope;
      const data = useVM().data;
      if (typeof scope[prop as any] !== 'undefined') {
        scope[prop as any] = value;
      } else if (typeof (target as any)[prop] !== 'undefined') {
        return Reflect.set(target, prop, value, receiver);
      } else {
        if (typeof value === 'object') {
          data[prop as any] = {};
        } else {
          data[prop as any] = value;
        }
      }
      return true;
    },
  });
  return proxy;
}

export function deepCopy<T>(a: T): T {
  if (a === null) {
    return null as any;
  }
  if (typeof a === 'object') {
    if (Array.isArray(a)) {
      const b: any = [];
      for (const key in a) {
        b[key] = deepCopy(a[key]);
      }
      return b;
    } else {
      const b: any = {};
      for (const key in a) {
        b[key] = deepCopy(a[key]);
      }
      return b;
    }
  } else {
    return a;
  }
}

export function deepCopyMap<T>(a: T, predicate: (value: any) => any): T {
  if (typeof a === 'object') {
    const res = predicate(a);
    if (res) {
      return res;
    }
    if (Array.isArray(a)) {
      const b: any = [];
      for (const key in a) {
        b[key] = deepCopyMap(a[key], predicate);
      }
      return b;
    } else {
      const b: any = {};
      for (const key in a) {
        b[key] = deepCopyMap(a[key], predicate);
      }
      return b;
    }
  } else {
    return a;
  }
}
