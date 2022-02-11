import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A simple tab bar component that ensures only one <oxy-tab> is active at a
 * time. Example:
 *
 *   <oxy-tabs>
 *     <oxy-tab selected>Pizza</oxy-tab>
 *     <oxy-tab>Pasta</oxy-tab>
 *   </oxy-tabs>
 */
@customElement('oxy-tabs')
export class OxyTabs extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
      }
      :host([orientation="horizontal"]) {
        flex-direction: row;
        border-bottom: var(--oxy-tabs-border, 1px solid black);
      }
      :host([orientation="vertical"]) {
        flex-direction: column;
        border-left: var(--oxy-tabs-border, 1px solid black);
      }
    `;
  }

  @property({type: String, reflect: true}) orientation = 'horizontal';
  @property({type: Number, reflect: true}) selected = 0;

  constructor() {
    super();
    this.setAttribute('role', 'tablist');
    this.addEventListener('click', this.onClick);
  }

  connectedCallback() {
    super.connectedCallback();
    // this.applyOrientationToChildren();
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('orientation')) {
      this.applyOrientationToChildren();
    }
    if (changedProps.has('selected')) {
      this.selectTabIndex(this.selected);
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  private applyOrientationToChildren() {
    console.log('applying orientation', this.orientation);
    this.childNodes.forEach(node => {
      if (node.nodeType != Node.ELEMENT_NODE) return;
      const elem = <Element>(node);
      elem.setAttribute('orientation', this.orientation);
    });
  }

  private onClick(event: MouseEvent) {
    // Iterate the tree up to find direct child clicked on.
    let clickedChild: HTMLElement|null = <HTMLElement>event.target;
    while (clickedChild) {
      if (clickedChild.parentElement === this) break;
      clickedChild = clickedChild.parentElement;
    }
    if (!clickedChild) return;
    // Find index of direct child.
    const children = this.getDirectChildren();
    this.selected = children.indexOf(clickedChild);
  }

  private selectTabIndex(selectedIndex: number) {
    const children = this.getDirectChildren();
    children.forEach((child, index) => {
      if (index === selectedIndex) {
        child.setAttribute('selected', '');
      } else {
        child.removeAttribute('selected');
      }
    });
  }

  private getDirectChildren() {
    let children: Element[] = [];
    this.childNodes.forEach(node => {
      if (node.nodeType != Node.ELEMENT_NODE) return;
      children.push(<Element>node);
    });
    return children;
  }
}
