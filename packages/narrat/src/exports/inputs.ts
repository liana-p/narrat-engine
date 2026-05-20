export type {
  ButtonKeybind,
  AnalogKeybind,
  ButtonAction,
  AnalogAction,
  ButtonActionState,
  AnalogDirectionState,
  AnalogActionState,
  Action,
  Inputs,
} from '@/inputs/Inputs';
export type { selectedClass } from '@/inputs/inputs-utils';
export type {
  OldNavigationState,
  useOldNavigation,
} from '@/inputs/useNavigation';
export { useNavigation } from '@/inputs/useNewNavigation';
export type { InputListener } from '@/stores/inputs-store';
