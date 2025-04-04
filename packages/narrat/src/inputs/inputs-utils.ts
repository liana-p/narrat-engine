import { useInputs } from '@/stores/inputs-store';

export function selectedClass(selected: boolean) {
  const inputs = useInputs();
  const result: Record<string, boolean> = {
    selected,
  };
  if (selected) {
    if (inputs.isGamepad) {
      result['gamepad-selected'] = true;
    } else {
      result['keyboard-selected'] = true;
    }
  }
  return result;
}
