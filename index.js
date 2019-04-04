import './trello-column.js';
import './trello-card.js';

import { getAllColumns, getAllCards, addColumn } from './service.js'

window.addEventListener('load', () => {
  initData()
});

async function initData(){
  const addColumn = document.getElementById('addColumn')
  addColumn.addEventListener('click', _addColumn.bind(this));
  await getColumns();
  await getCards();
}

async function _addColumn(){
  const trelloBoard = document.querySelector('trello-board');
  const newColumnName = prompt("Please enter column name:");
    if (newColumnName != null && newColumnName != "") {
      const column = {
        "title": newColumnName,
      }
      const result = await addColumn(column);
      if(result){
        const el = document.createElement('trello-column');
        el.id = result.id;
        column.id = el.id;
        el.column = column;
        trelloBoard.appendChild(el);
      }   
    }
}

async function getColumns() {

  const trelloBoard = document.querySelector('trello-board');
  const columns = await getAllColumns();

  columns.forEach(column => {
    const el = document.createElement('trello-column');
    el.id = column.id;
    el.column = column;
    trelloBoard.appendChild(el);
  });

}

async function getCards() {
  const cards = await getAllCards();

  cards.forEach(card => {
    const $column = document.getElementById(card.columnId)
    if($column){
      const cardList = $column.shadowRoot.querySelector(".cards"); 
      const el = document.createElement('trello-card');
      el.card = card;
      cardList.appendChild(el);
    }
  });
}