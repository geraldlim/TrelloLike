class TrelloColumn extends HTMLElement {

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  set column(column) {
    this.root.innerHTML = `
      <style>
      .column{
        background: #dfe3e6;
        padding: 1em 1em;
        border-radius: 0.3em;
      }
      .column-header {
        position: relative;
      }
      h2 {
        font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
        color: #17394d;
        margin: 0;
      }
      .cards{
        padding: 0
      }
      </style>
      <div class="column" id="${column.id}">
        <div class="column-header"> 
          <h2>${column.title}</h2>
        </div>
        <div class="cards"></div>
      </div>
    `;
  }

}

customElements.define('trello-column', TrelloColumn);