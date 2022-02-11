import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators';

import './oxy-icon-showcase';
import '../src/oxy-button';
import '../src/oxy-checkbox';
import '../src/oxy-dialog';
import '../src/oxy-icon';
import '../src/oxy-icons-base';
import '../src/oxy-input';
import '../src/oxy-textarea';
import '../src/oxy-slider';
import '../src/oxy-tabs';
import '../src/oxy-tab';

@customElement('oxy-demo-elements')
export class OxyDemoElements extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;

      --light-theme-c1: #fcfcfc;
      --light-theme-c2: #f9f9f9;
      --light-theme-c3: #f3f3f3;
      --light-theme-c4: #e0e0e0;
      --light-theme-c5: #d0d0d0;
      --light-theme-c6: #c0c0c0;

      --dark-theme-c1: #19262e;
      --dark-theme-c2: #253945;
      --dark-theme-c3: #324d5c;
      --dark-theme-c4: #3f6073;
      --dark-theme-c5: #4b738a;
      --dark-theme-c6: #5886a1;
    }

    :host([dark]) {
      --oxy-scrollbar-track-color: var(--dark-theme-c2);
      --oxy-scrollbar-thumb-color: var(--dark-theme-c5);
      --oxy-scrollbar-thumb-hover-color: var(--dark-theme-c6);
    }

    h2 {
      margin-top: 0;
      align-self: center;
    }

    .paper-card {
      display: flex;
      flex-direction: column;
      padding: 16px;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
    .paper-card:not(:last-child) {
      margin-bottom: 32px;
    }
    :host([light]) .paper-card {
      background-color: var(--light-theme-c3);
    }
    :host([dark]) .paper-card {
      background-color: var(--dark-theme-c2);
    }

    .scrollable {
      overflow: auto;
    }

    /* Button styles. */

    #button {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #button oxy-button {
      min-width: 200px;
      padding: 8px 16px;
      margin: 8px;
    }
    :host([light]) #button oxy-button[raised] {
      background: var(--light-theme-c1);
    }
    :host([dark]) #button oxy-button[raised] {
      background: var(--dark-theme-c3);
    }

    /* Checkbox styles. */

    #checkbox {
      display: flex;
      flex-direction: column;
      align-self: center;
    }
    :host([light]) oxy-checkbox {
      --oxy-checkbox-unchecked-background: white;
    }
    :host([dark]) oxy-checkbox {
      --oxy-checkbox-unchecked-background: var(--dark-theme-c5);
      --oxy-checkbox-unchecked-border: none;
    }

    /* Icon styles. */

    #icons {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    #icons oxy-icon {
      padding: 8px;
    }
    #iconbutton {
      align-self: center;
    }

    /* Input styles. */

    oxy-input {
      padding: 4px 32px;
    }
    :host([light]) oxy-input {
      --oxy-input-border: 2px solid var(--light-theme-c4);
      --oxy-input-border-focused: 2px solid var(--light-theme-c6);
    }
    :host([dark]) oxy-input {
      --oxy-input-background: var(--dark-theme-c2);
      --oxy-input-border: 2px solid var(--dark-theme-c4);
      --oxy-input-background-focused: var(--dark-theme-c2);
      --oxy-input-border-focused: 2px solid var(--dark-theme-c6);
    }

    /* Textarea styles. */

    oxy-textarea {
      padding: 4px 32px;
      height: 5em;
    }
    :host([light]) oxy-textarea {
      --oxy-textarea-border: 2px solid var(--light-theme-c4);
      --oxy-textarea-border-focused: 2px solid var(--light-theme-c6);
    }
    :host([dark]) oxy-textarea {
      --oxy-textarea-background: var(--dark-theme-c2);
      --oxy-textarea-border: 2px solid var(--dark-theme-c4);
      --oxy-textarea-background-focused: var(--dark-theme-c2);
      --oxy-textarea-border-focused: 2px solid var(--dark-theme-c6);
    }

    /* Slider styles. */

    oxy-slider {
      margin: 0 32px;
    }
    :host([dark]) oxy-slider {
      --oxy-slider-track-color: var(--dark-theme-c5);
      --oxy-slider-track-active-color: var(--dark-theme-c6);
      --oxy-slider-thumb-color: white;
    }

    /* Tabs style. */

    #tabs {
    }
    oxy-tabs:not(:last-child) {
      margin-bottom: 16px;
    }
    oxy-tabs {
      margin: 0 32px;
    }
    :host([light]) oxy-tabs {
      --oxy-tabs-border-color: black;
    }
    :host([dark]) oxy-tabs {
      --oxy-tabs-border: 1px solid gray;
      --oxy-tab-indicator-color: #28f;
    }

    /* Icon dialog. */

    :host([dark]) oxy-dialog {
      --oxy-dialog-background: var(--dark-theme-c2);
      --oxy-icon-name-color: lightgray;
    }
    oxy-dialog::part(dialog) {
      display: flex;
      flex-direction: column;
      max-width: 750px;
    }
    oxy-icon-showcase {
      text-align: center;
    }
  `;

  @state() iconDialogOpened = false;

  render() {
    return html`
      <div class="paper-card">
        <h2>&lt;oxy-button&gt;</h2>
        <div id="button">
          <oxy-button @click=${() => console.log('click')}>Flat button</oxy-button>
          <oxy-button raised>Raised button</oxy-button>
          <oxy-button disabled>Disabled flat</oxy-button>
          <oxy-button disabled raised>Disabled raised</oxy-button>
        </div>
      </div>

      <div class="paper-card">
        <h2>&lt;oxy-checkbox&gt;</h2>
        <div id="checkbox">
          <oxy-checkbox>Normal state</oxy-checkbox>
          <oxy-checkbox checked>Checked state</oxy-checkbox>
          <oxy-checkbox indeterminate>Indeterminate state</oxy-checkbox>
          <oxy-checkbox disabled>Disabled state</oxy-checkbox>
          <oxy-checkbox disabled checked>Disabled checked</oxy-checkbox>
        </div>
      </div>

      <div class="paper-card">
        <h2>&lt;oxy-icon&gt;</h2>
        <div id="icons">
          <oxy-icon icon="icons:accessibility"></oxy-icon>
          <oxy-icon icon="icons:account-circle"></oxy-icon>
          <oxy-icon icon="icons:add-alert"></oxy-icon>
          <oxy-icon icon="icons:alarm"></oxy-icon>
          <oxy-icon icon="icons:backup"></oxy-icon>
          <oxy-icon icon="icons:block"></oxy-icon>
          <oxy-icon icon="icons:bookmark"></oxy-icon>
          <oxy-icon icon="icons:bug-report"></oxy-icon>
          <oxy-icon icon="icons:cloud"></oxy-icon>
        </div>
        <oxy-button id="iconbutton" @click=${this.onOpenIconDialog}>
          Show all icons
        </oxy-button>
      </div>

      <div class="paper-card">
        <h2>&lt;oxy-input&gt;</h2>
        <oxy-input placeholder="Placeholder text"></oxy-input>
        <oxy-input readonly value="Readonly"></oxy-input>
        <oxy-input disabled value="Disabled"></oxy-input>
      </div>


      <div class="paper-card">
        <h2>&lt;oxy-textarea&gt;</h2>
        <oxy-textarea placeholder="Enter some text..."></oxy-textarea>
      </div>

      <div class="paper-card">
        <h2>&lt;oxy-slider&gt;</h2>
        <oxy-slider value="20" min="0" max="100"></oxy-slider>
        <oxy-slider disabled value="20" min="0" max="100"></oxy-slider>
      </div>

      <div class="paper-card">
        <h2>&lt;oxy-tabs&gt;</h2>
        <div id="tabs">
          <oxy-tabs>
            <oxy-tab>Horizontal tab 1</oxy-tab>
            <oxy-tab>Horizontal tab 2</oxy-tab>
          </oxy-tabs>
          <oxy-tabs orientation="vertical">
            <oxy-tab>Vertical tab 1</oxy-tab>
            <oxy-tab>Vertical tab 2</oxy-tab>
          </oxy-tabs>
        </div>
      </div>

      <oxy-dialog
          backdrop
          ?opened=${this.iconDialogOpened}
          @closed=${this.onCloseIconDialog}>
        <div class="scrollable">
          <oxy-icon-showcase></oxy-icon-showcase>
        </div>
        <div slot="buttons">
          <oxy-button @click=${this.onCloseIconDialog}>Close</oxy-button>
        </div>
      </oxy-dialog>
    `;
  }

  private onOpenIconDialog() {
    this.iconDialogOpened = true;
  }

  private onCloseIconDialog() {
    console.log('closed');
    this.iconDialogOpened = false;
  }
}

@customElement('oxy-demo')
export class OxyDemo extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      min-height: 100vh;
    }
    oxy-demo-elements:not(:last-child) {
      margin-right: 32px;
    }
    h1 {
      margin-top: 0;
      text-align: center;
    }
    #light-theme,
    #dark-theme {
      flex: 1;
      padding: 32px;
    }
    #dark-theme {
      background-color: #192626;
      color: white;
    }
  `;

  render() {
    return html`
      <div id="light-theme">
        <h1>Light example</h1>
        <oxy-demo-elements light></oxy-demo-elements>
      </div>

      <div id="dark-theme">
        <h1>Dark example</h1>
        <oxy-demo-elements dark></oxy-demo-elements>
      </div>
    `;
  }
}
