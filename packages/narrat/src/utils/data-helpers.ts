import { getConfig } from '@/config';
import { useHud } from '@/stores/hud-stats-store';
import { useInventory } from '@/stores/inventory-store';
import { useQuests } from '@/stores/quest-log';
import { useScreens } from '@/stores/screens-store';
import { useSkills } from '@/stores/skills';
import { useVM } from '@/stores/vm-store';
import { useMain } from '@/stores/main-store';

export function findDataHelper<T>(sourceObj: any, path: string): [T, string] {
  const keys = path.split('.');
  let obj = sourceObj;
  const end = keys.length - 1;
  let key = keys[0];
  let i = 0;
  for (i = 0; i < end; i++) {
    key = keys[i];
    if (!obj[key]) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  key = keys[i];
  return [obj, key];
}

export function findDataHelperWithoutAutoCreate<T>(
  sourceObj: any,
  path: string,
): [T, string] | undefined {
  const keys = path.split('.');
  let obj = sourceObj;
  const end = keys.length - 1;
  let key = keys[0];
  let i = 0;
  for (i = 0; i < end; i++) {
    key = keys[i];
    if (!obj[key]) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  key = keys[i];
  if (typeof obj[key] === 'undefined') {
    obj[key] = null;
  }
  return [obj, key];
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
    skills: skills.skills,
    buttons: screens.buttons,
    items: inventory.items,
    quests: useQuests().quests,
    stats: useHud().hudStats,
    scope,
    config: getConfig(),
    gameOptions: useMain().options,
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
