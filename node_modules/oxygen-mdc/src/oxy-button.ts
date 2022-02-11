import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A simple button element with some default styles. The button can be
 * customized using CSS variables, see styles below. If the 'raised' attribute
 * is set, the button obtains a shadow. If the 'disabled' attribute is set,
 * the button becomes more transparent and pointer events are ignored.
 */
@customElement('oxy-button')
export class OxyButton extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        position: relative;
        font-weight: 500;
        background: transparent;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        user-select: none;
      }
      :host::before,
      :host::after {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
        border-radius: inherit;
        content: "";
      }
      :host::before {
        opacity: 0;
        transition: all 50ms;
      }
      :host(:hover)::before {
        background: var(--oxy-button-hover-color, currentcolor);
        opacity: 0.1;
      }
      :host(:active)::before,
      :host([active])::before {
        background: var(--oxy-button-active-color, currentcolor);
        opacity: 0.2;
      }
      :host(:focus-visible)::after {
        box-shadow: 0 0 0 2px var(--oxy-button-focus-color, cornflowerblue);
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
      :host([raised]) {
        padding: 8px 16px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12);
      }
      :host([text]) {
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.85em;
      }
    `;
  }

  @property({type: Boolean, reflect: true}) raised = false;
  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean, reflect: true}) active = false;

  firstUpdated() {
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
