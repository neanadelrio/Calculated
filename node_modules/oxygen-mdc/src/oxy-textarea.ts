import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A simple text area component.
 */
@customElement('oxy-textarea')
export class OxyTextarea extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
      }
      #container {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        align-items: stretch;
        background: var(--oxy-textarea-background, white);
        border: var(--oxy-textarea-border, 1px solid #ddd);
        border-radius: var(--oxy-textarea-border-radius, 2px);
        box-shadow: var(--oxy-textarea-box-shadow, none);
        transition: all 50ms;
      }
      :host([focused]) #container {
        background: var(--oxy-textarea-background-focused, white);
        border: var(--oxy-textarea-border-focused, 1px solid #ddd);
        box-shadow: var(--oxy-textarea-box-shadow-focused, none);
      }
      textarea {
        flex-grow: 1;
        flex-shrink: 0;
        padding: var(--oxy-textarea-text-padding, 6px);
        color: var(--oxy-textarea-text-color, currentcolor);
        font: inherit;
        margin: 0;
        border: none;
        box-shadow: none;
        box-sizing: border-box;
        outline: none;
        background: transparent;
        width: 100%;
        resize: var(--oxy-textarea-resize, none);
      }
      textarea::placeholder {
        color: var(--oxy-textarea-placeholder-color, gray);
      }
      textarea::-webkit-scrollbar {
        width: var(--oxy-scrollbar-width, 12px);
      }
      textarea::-webkit-scrollbar-track {
        background: var(--oxy-scrollbar-track-color, #eee);
        border-radius: var(--oxy-scrollbar-track-border-radius, 0);
      }
      textarea::-webkit-scrollbar-thumb {
        background: var(--oxy-scrollbar-thumb-color, #888);
        border: var(--oxy-scrollbar-thumb-border,
            1px solid var(--oxy-scrollbar-track-color, #eee));
        border-radius: var(--oxy-scrollbar-thumb-border-radius, 0);
        box-shadow: var(--oxy-scrollbar-thumb-box-shadow, none);
      }
      textarea::-webkit-scrollbar-thumb:hover {
        background: var(--oxy-scrollbar-thumb-hover-color, #555);
        box-shadow: var(--oxy-scrollbar-thumb-hover-box-shadow, none);
      }
    `;
  }

  private textarea: HTMLInputElement|null = null;

  @property({type: String}) value = '';
  @property({type: String}) placeholder = '';
  @property({type: Boolean}) readonly = false;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean, reflect: true}) focused = false;
  @property({type: Boolean}) selectOnFocus = false;

  render() {
    return html`
      <div id="container">
      <textarea
          id="area"
          .value=${this.value}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          placeholder="${this.placeholder}"
          spellcheck="false"
          @input=${this.onValueChanged}
          @focus=${this.onFocus}
          @blur=${this.onBlur}></textarea></div>
    `;
  }

  firstUpdated() {
    if (!this.shadowRoot) return;
    this.textarea = this.shadowRoot.getElementById('area') as HTMLInputElement;
  }

  focus() {
    if (!this.textarea) return;
    this.textarea.focus();
  }

  select() {
    if (!this.textarea) return;
    this.textarea.setSelectionRange(0, this.textarea.value.length);
  }

  private onValueChanged() {
    if (!this.textarea) return;
    this.value = this.textarea.value;
    this.dispatchEvent(new CustomEvent('change', {detail: this.value}));
  }

  private onFocus() {
    this.focused = true;
    if (this.selectOnFocus) {
      this.select();
    }
  }

  private onBlur() {
    this.focused = false;
  }
}
