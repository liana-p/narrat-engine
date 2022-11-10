import { GameObject } from '@/scene/GameObject';
import { createSpriteNode } from '@/scene/PixiNodes';
import { Vec2 } from 'narrat';
import { Component, registerComponentClass } from '../scene/Component';

export interface NpcComponentOptions {
  dialogLabel: string;
}
export class NpcComponent extends Component {
  public static type = 'NpcComponent';
  public static serialisableFields: string[] = ['dialogLabel'];

  public dialogLabel: string = 'main';
  public chatIcon: GameObject | null = null;

  public enableChatIcon() {
    this.chatIcon = new GameObject({
      node: createSpriteNode('img/ui/talk.png'),
      scene: this.scene,
      parent: this.gameObject,
    });
    this.chatIcon.setPosition(Vec2.create(0, -100));
  }

  public disableChatIcon() {
    if (this.chatIcon) {
      this.chatIcon.destroy();
      this.chatIcon = null;
    }
  }
}

registerComponentClass({
  componentType: NpcComponent.type,
  constructor: NpcComponent,
});
