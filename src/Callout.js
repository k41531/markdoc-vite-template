import { html, css, LitElement } from "lit";

export class MarkdocCallout extends LitElement {
  static styles = css`
    .callout {
      color: white;
    }
    .caution {
      background-color: #d97917;
    }
    .warning {
      background-color: #ed5f74;
    }
  `;

  static properties = {
    type: { type: String },
  };

  constructor() {
    super();
    this.type = "note";
  }

  render() {
    return html`<p class="callout ${this.type}"><slot></slot></p>`;
  }
}
