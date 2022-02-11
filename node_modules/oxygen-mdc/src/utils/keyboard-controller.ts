import {ReactiveController, LitElement} from 'lit';

export class KeyboardController implements ReactiveController {
  private host: LitElement;
  private readonly keyDownListener = this.onKeyDown.bind(this);
  private readonly keyUpListener = this.onKeyUp.bind(this);

  constructor(host: LitElement) {
    this.host = host;
    this.host.addController(this);
  }

  hostConnected() {
    this.host.addEventListener('keydown', this.keyDownListener);
    this.host.addEventListener('keyup', this.keyUpListener);
  }

  hostDisconnected() {
    this.host.removeEventListener('keydown', this.keyDownListener);
    this.host.removeEventListener('keyup', this.keyUpListener);
  }

  private onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        this.active = true;
        event.preventDefault();
        break;
      case 'Enter':
        this.active = true;
        event.preventDefault();
        this.click();
        break;
      default:
        break;
    }
  }

  private onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        this.active = false;
        this.click();
        break;
      case 'Enter':
        this.active = false;
        break;
      default:
        break;
    }
  }
}
