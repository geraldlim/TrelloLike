class TrelloCard extends HTMLElement {

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  set card(card) {
    this.root.innerHTML = `
      <style>
      div {
        background: white;
        margin: 1em 0;
        padding: 0.1em 0.8em;
        border-radius: 0.3em;
      }
      div:hover{
         background: rgba(255,255,255,0.8);
      }
      h2 {
        font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
        color: #17394d;
        font-size: 1.2em;
        cursor: pointer;
      }
      p {
        font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
        font-size: 0.9em;
      }
      </style>
      <div id="${card.id}" colId="${card.columnId}">
        <h2>${card.title}</h2>
        <p>${card.description}</p>
      </div>
    `;
  }
  
}

customElements.define('trello-card', TrelloCard);