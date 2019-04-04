import { editCard, deleteCard} from './service.js'

class TrelloCard extends HTMLElement {

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.$card = this.shadowRoot.querySelector(".card")
    this.$card.getElementsByTagName('h2')[0].addEventListener('click', this._showDesc.bind(this));

    this.$editCardBtn = this.shadowRoot.getElementById('editCard');
    this.$editCardBtn.addEventListener('click', this._editCard.bind(this));

    this.$deleteCardBtn = this.shadowRoot.getElementById('deleteCard');
    this.$deleteCardBtn.addEventListener('click', this._deleteCard.bind(this));
  }

  _showDesc() {
    const cardDesc = this.$card.getElementsByTagName('p')[0]
    cardDesc.className ? cardDesc.removeAttribute('class') : cardDesc.setAttribute('class','show')
    const colOptions = this.shadowRoot.getElementById('control-container')
    colOptions.className ? colOptions.removeAttribute('class') : colOptions.setAttribute('class','show')
  }

  async _editCard() {
    const header = this.$card.getElementsByTagName('h2')[0]
    const newCardName = prompt("Please enter card name:", header.textContent);
    if (newCardName != null && newCardName != "") {
      const desc = this.$card.getElementsByTagName('p')[0]
      const newCardDesc = prompt("Please enter card description:", desc.textContent);
      const card = {
        "id": parseInt(this.$card.id),
        "title": newCardName,
        "description": newCardDesc,
        "columnId": parseInt(this.$card.getAttribute("colId"))
      }
      const result = await editCard(card);
      if(result){
        header.textContent = newCardName;
        desc.textContent = newCardDesc;
      }
    }
  }

  async _deleteCard() {
    const result = await deleteCard(this.$card.id)
    if(result){
      const card = this.$card
      card.parentNode.removeChild(card)
    }
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
      #deleteCard {
        background: url(materials/icons/delete.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
      #editCard {
        background: url(materials/icons/edit.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
      #control-container{
        background: transparent;
        display: flex;
        flex-direction: row;
        margin: 0;
        transition: opacity 2s ease-out;
        opacity: 0; 
        height: 0;
        overflow: hidden;
        padding: 0
      }
      #control-container.show {
        opacity: 1;
        height: 1em;
        margin: 0.5em 0;
      }
      .controls{
        cursor: pointer;
        padding: 0 1.5em;
        font-size: 0.8em;
        font-weight: 500;
      }
      </style>
      <div class="card" id="${card.id}" colId="${card.columnId}">
        <h2>${card.title}</h2>
        <p>${card.description}</p>
        <div id="control-container">
          <span id="editCard" class="controls">Edit Card</span>
          <span id="deleteCard" class="controls">Remove Card</span>
        </div>
      </div>
    `;
  }
  
}

customElements.define('trello-card', TrelloCard);