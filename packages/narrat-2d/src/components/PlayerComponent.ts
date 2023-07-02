import { GameObject } from '@/scene/GameObject';
import { useInputs, useMain, useVM } from 'narrat';
import { Component, registerComponentClass } from '../scene/Component';
import { NpcComponent } from './NpcComponent';

export interface PlayerComponentOptions {}
export class PlayerComponent extends Component {
  public static type = 'PlayerComponent';

  public interactableNpc: NpcComponent | null = null;
  public interacting: boolean = false;

  public onTriggerEnter(other: GameObject) {
    const npc = other.getComponent<NpcComponent>(NpcComponent.type);
    if (npc && npc.dialogLabel) {
      this.enableNpcInteraction(npc);
    }
  }

  public onTriggerExit(other: GameObject) {
    if (
      this.interactableNpc &&
      other.id === this.interactableNpc.gameObject.id
    ) {
      this.removeNpcInteraction();
    }
  }

  public update() {
    const inputs = useInputs();
    if (useMain().inScript) {
      return;
    }
    if (
      this.interactableNpc &&
      inputs.getInputs().getButton('interact').active
    ) {
      this.startNpcInteraction();
    }
  }

  enableNpcInteraction(npc: NpcComponent) {
    npc.enableChatIcon();
    this.interactableNpc = npc;
  }

  startNpcInteraction() {
    if (this.interactableNpc && !this.interactableNpc.gameObject.destroyed) {
      this.interacting = true;
      useVM().jumpToLabel(this.interactableNpc.dialogLabel);
      this.removeNpcInteraction();
    }
  }

  removeNpcInteraction() {
    if (this.interactableNpc && !this.interactableNpc.gameObject.destroyed) {
      this.interactableNpc.disableChatIcon();
      this.interactableNpc = null;
    }
  }
}

registerComponentClass({
  componentType: PlayerComponent.type,
  constructor: PlayerComponent,
});
