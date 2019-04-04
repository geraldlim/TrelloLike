import { editColumn, deleteColumn } from './service.js'

class TrelloColumn extends HTMLElement {

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.$columnId = this.shadowRoot.querySelector(".column").id; 

    this.$optionBtn = this.shadowRoot.getElementById('options');
    this.$optionBtn.addEventListener('click', this._showOptions.bind(this));

    this.$deleteColBtn = this.shadowRoot.getElementById('deleteColumn');
    this.$deleteColBtn.addEventListener('click', this._deleteColumn.bind(this));

    this.$editColBtn = this.shadowRoot.getElementById('editColumn');
    this.$editColBtn.addEventListener('click', this._editColumn.bind(this));
  }

  _showOptions() {
    const colOptions = this.shadowRoot.getElementById('control-container')
    colOptions.className ? colOptions.removeAttribute('class') : colOptions.setAttribute('class','show')
  }

  async _editColumn() {
    const header = this.shadowRoot.querySelector(".column-header").getElementsByTagName('h2')[0]
    const newHeader = prompt("Please enter header name:", header.textContent);
    if (newHeader != null && newHeader != "") {
      const column = {
        "id": parseInt(this.$columnId),
        "title": newHeader,
      }
      const result = await editColumn(column)
      if(result){
         header.textContent = newHeader;
      }
    }
  }

  async _deleteColumn() {
    const result = await deleteColumn(this.$columnId); 
    if(result){
      const column = document.getElementById(this.$columnId);
      column.parentNode.removeChild(column);
    }
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
      #options {
        position: absolute;
        background: url(materials/icons/option.png);
        background-repeat: no-repeat;
        background-size: contain;
        top: 0;
        right: 0;
        width: 2em;
        height: 2em;
        padding: 0;
      }
       #deleteColumn {
        background: url(materials/icons/delete.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
      #editColumn {
        background: url(materials/icons/edit.png);
        background-repeat: no-repeat;
        background-size: contain;
      }
      #control-container{
        display: flex;
        flex-direction: row;
        margin: 0;
        transition: opacity 2s ease-out;
        opacity: 0; 
        height: 0;
        overflow: hidden;
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
      .cards{
        padding: 0
      }
      </style>
      <div class="column" id="${column.id}">
        <div class="column-header"> 
          <h2>${column.title}</h2>
          <span id="options" class="controls"></span>
        </div>
        <div id="control-container">
          <span id="editColumn" class="controls">Edit Column</span>
          <span id="deleteColumn" class="controls">Remove Column</span>
        </div>
        <div class="cards"></div>
      </div>
    `;
  }

}

customElements.define('trello-column', TrelloColumn);