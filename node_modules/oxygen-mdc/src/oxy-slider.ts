import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A simple slider component.
 */
@customElement('oxy-slider')
export class OxySlider extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        position: relative;

        border-radius: 4px;
        outline: none;
        cursor: pointer;
        user-select: none;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      :host::after {
        position: absolute;
        top: 0;
        left: -2px;
        bottom: 0;
        right: -2px;
        pointer-events: none;
        border-radius: inherit;
        content: "";
      }
      :host(:focus-visible)::after {
        box-shadow: 0 0 0 2px var(--oxy-slider-focus-color, cornflowerblue);
      }

      #container {
        position: relative;
      }
      #track {
        background-color: var(--oxy-slider-track-color, #666);
        height: var(--oxy-slider-track-height, 2px);
        margin: 16px 0;
      }
      :host(:active) #track {
        background-color: var(--oxy-slider-track-active-color,
            var(--oxy-slider-track-color, #666));
      }
      #thumb {
        position: absolute;
        top: calc(50% - var(--oxy-slider-thumb-size, 14px) / 2);
        left: 0%;
        transform: translateX(-50%);

        background-color: var(--oxy-slider-thumb-color, #333);
        width: var(--oxy-slider-thumb-size, 14px);
        height: var(--oxy-slider-thumb-size, 14px);
        border-radius: var(--oxy-slider-thumb-radius, 4px);
      }
      :host(:active) #thumb {
        background-color: var(--oxy-slider-thumb-active-color,
            var(--oxy-slider-thumb-color, #333));
        transform: translateX(-50%) scale(1.2);
      }
    `;
  }

  private thumb: HTMLElement|undefined;
  private container: HTMLElement|undefined;
  private dragging: boolean = false;
  private buttons: number = 0;

  @property({type: Boolean, reflect: true}) disabled: boolean = false;
  @property({type: Number}) min: number = 0;
  @property({type: Number}) max: number = 100;
  @property({type: Number}) value: number = 0;

  firstUpdated() {
    this.setAttribute('role', 'slider');
    this.setAttribute('tabindex', '0');
    if (!this.shadowRoot) return;
    this.thumb = this.shadowRoot.getElementById('thumb') as HTMLElement;
    this.container = this.shadowRoot.getElementById('container') as HTMLElement;
  }

  updated(updatedProps: Map<string, any>) {
    if (updatedProps.has('min') || updatedProps.has('max')) {
      this.setAttribute('aria-valuemin', this.min.toString());
      this.setAttribute('aria-valuemax', this.max.toString());
    }
    if (updatedProps.has('value')) {
      this.value = Math.max(this.min, Math.min(this.max, this.value));
      this.setAttribute('aria-valuenow', this.value.toString());
      this.updateSlider();
      this.dispatchEvent(new CustomEvent('change', {detail: this.value}));
    }
    if (updatedProps.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }

  render() {
    return html`
      <div
          id="container"
          @mousedown=${this.onMouseDown}
          @mouseup=${this.onMouseUp}
          @mousemove=${this.onMouseMove}
          @mouseleave=${this.onMouseLeave}
          @mouseenter=${this.onMouseEnter}
          @touchstart=${this.onTouchStart}
          @touchend=${this.onTouchEnd}
          @touchmove=${this.onTouchMove}>
        <div id="track"></div>
        <div id="thumb"></div>
      </div>
    `;
  }

  private onMouseDown(event: MouseEvent) {
    this.dragging = true;
    this.onMouseMove(event);
  }

  private onMouseUp() {
    this.dragging = false;
  }

  private onMouseLeave(event: MouseEvent) {
    this.dragging = false;
    this.buttons = event.buttons;
  }

  private onMouseEnter(event: MouseEvent) {
    if (event.buttons !== 0 && this.buttons === event.buttons) {
      this.dragging = true;
    }
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;
    this.updateValueFromMouse(event.clientX);
  }

  private onTouchStart(event: TouchEvent) {
    this.dragging = true;
    this.onTouchMove(event);
  }

  private onTouchEnd() {
    this.dragging = false;
  }

  private onTouchMove(event: TouchEvent) {
    if (!this.container || !this.dragging) return;
    if (event.touches.length < 1) return;
    this.updateValueFromMouse(event.touches[0].clientX);
  }

  private updateValueFromMouse(clientX: number) {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const ratio = (clientX - rect.left) / (rect.right - rect.left);
    const value = Math.round(this.min + ratio * (this.max - this.min));
    this.value = value;
  }

  private updateSlider() {
    if (!this.thumb) return;
    const ratio = (this.value - this.min) / (this.max - this.min);
    this.thumb.style.left = (100.0 * ratio) + '%';
  }
}
