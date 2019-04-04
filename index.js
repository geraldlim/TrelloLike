import './trello-column.js';
import './trello-card.js';

import { getAllColumns, getAllCards } from './service.js'

window.addEventListener('load', () => {
  initData()
});

async function initData(){
  await getColumns();
  await getCards();
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