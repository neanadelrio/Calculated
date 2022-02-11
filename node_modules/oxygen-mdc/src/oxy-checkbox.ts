import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A basic checkbox element.
 */
@customElement('oxy-checkbox')
export class OxyCheckbox extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        user-select: none;
        outline: none;
        position: relative;
        border-radius: 4px;
        margin: 4px;
        cursor: pointer;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

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
      :host(:focus-visible)::after {
        box-shadow: 0 0 0 2px var(--oxy-checkbox-focus-color, cornflowerblue);
      }

      #label {
        margin: 2px 8px;
        flex-grow: 1;
      }
      #checkbox {
        flex-shrink: 0;
        position: relative;
        width: calc(1em + 3px);
        height: calc(1em + 3px);
        border-radius: 4px;
        margin: 2px;
        box-sizing: border-box;
        border: var(--oxy-checkbox-unchecked-border, 2px solid gray);
        background: var(--oxy-checkbox-unchecked-background, none);
        transition: transform 50ms;
      }
      :host([checked]) #checkbox,
      :host([indeterminate]) #checkbox {
        border: var(--oxy-checkbox-checked-border, none);
        background: var(--oxy-checkbox-checked-background, #28f);
      }
      :host(:active) #checkbox {
        transform: scale(0.9);
      }
      :host([checked]:active) #checkbox {
        transform: scale(1.1);
      }
      :host #checkbox::after {
        position: absolute;
        content: "";
      }
      :host([checked]) #checkbox::after {
        top: 16%;
        left: 35%;
        width: 0.25em;
        height: 0.5em;
        border: 0 solid var(--oxy-checkbox-check-color, white);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
      :host([indeterminate]) #checkbox::after {
        top: 45%;
        left: 20%;
        right: 20%;
        width: auto;
        height: 10%;
        background: var(--oxy-checkbox-check-color, white);
      }
    `;
  }

  @property({type: Boolean, reflect: true}) checked: boolean = false;
  @property({type: Boolean, reflect: true}) indeterminate: boolean = false;
  @property({type: Boolean, reflect: true}) disabled: boolean = false;

  firstUpdated() {
    this.setAttribute('role', 'checkbox');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', () => this.onClick());
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
    if (changedProps.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      this.dispatchEvent(new CustomEvent('change', {detail: this.checked}));
    }
  }

  render() {
    return html`
      <div id="checkbox"></div>
      <div id="label">
        <slot></slot>
      </div>
    `;
  }
  private onClick() {
    if (this.disabled) return;
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = false;
      return;
    }
    this.checked = !this.checked;
  }
}
