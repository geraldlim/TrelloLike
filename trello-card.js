class TrelloCard extends HTMLElement {

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.$card = this.shadowRoot.querySelector(".card")
    this.$card.getElementsByTagName('h2')[0].addEventListener('click', this._showDesc.bind(this));
  }

  _showDesc() {
    const cardDesc = this.$card.getElementsByTagName('p')[0]
    cardDesc.className ? cardDesc.removeAttribute('class') : cardDesc.setAttribute('class','show')
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
        margin: 0;
        transition: opacity 2s ease-out;
        opacity: 0; 
        height: 0;
        overflow: hidden;
      }
      p.show {
        opacity: 1;
        height: auto;
        margin: 1em 0;
      }
      </style>
      <div class="card" id="${card.id}" colId="${card.columnId}">
        <h2>${card.title}</h2>
        <p>${card.description}</p>
      </div>
    `;
  }
  
}

customElements.define('trello-card', TrelloCard);