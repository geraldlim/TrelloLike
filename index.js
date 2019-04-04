import './trello-column.js';
import './trello-card.js';
import { getAllColumns, getAllCards, addColumn, editCard } from './service.js'

window.addEventListener('load', () => {
  initData()
});

async function initData(){
  const addColumn = document.getElementById('addColumn')
  addColumn.addEventListener('click', _addColumn.bind(this));
  const searchCard = document.getElementById('searchCard')
  searchCard.addEventListener('keyup', _search.bind(this))
  await getColumns();
  await getCards();
}

async function _search(){
  const searchText = document.getElementById('searchCard').value
  const trelloBoard = document.querySelector('trello-board');
  //Loop all columns and empty cardList
  for(var i = 0; i < trelloBoard.children.length; i++){
    const cardList = trelloBoard.children[i].shadowRoot.querySelector(".cards")
    while (cardList.firstChild) {
      cardList.removeChild(cardList.firstChild);
    }
  }
  await getCards(searchText)
}

async function _addColumn(){
  const trelloBoard = document.querySelector('trello-board');
  const newColumnName = prompt("Please enter column name:");
    if (newColumnName != null && newColumnName != "") {
      const column = {
        "title": newColumnName,
      }
      
      const columns = await getAllColumns();
      const exists = columns.filter(eachColumn => eachColumn.title == newColumnName) 
      if(exists.length > 0){
        alert("Oh no! Column title already exists");
      }else{
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

async function getCards(searchText=null) {
  var cards = await getAllCards();
  if(searchText){
    searchText = searchText.toUpperCase()
    cards = cards.filter(eachCard => eachCard.title.toUpperCase().includes(searchText) || eachCard.description.toUpperCase().includes(searchText))  
  }

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

/*######## 
  Drag & Drop for cards onto different category
#########*/
window.allowDrop = function (ev){
  ev.preventDefault();
}

window.drag = function (ev) {
  // save selected card ID & columnID for transfer
  ev.dataTransfer.setData("cardId", ev.target.id);
  ev.dataTransfer.setData("colId", ev.target.getAttribute("colId"));
}

window.drop = async function (ev){
  ev.preventDefault();
  // retrieve selected card ID & column ID from transfer
  var cardId = ev.dataTransfer.getData("cardId");
  var colId = ev.dataTransfer.getData("colId");
  // get 'cards' html elements with all trello-card 
  const cardList = document.getElementById(colId).shadowRoot.querySelector(".cards").children;
  // loop all trello-cards and get selectedCard
  for(var i = 0; i < cardList.length; i++){
    const card = cardList[i]
    if (card.shadowRoot.querySelector(".card").id == cardId){
      // create new card with the target column ID
      const newCard = {
        "id": parseInt(cardId),
        "columnId": parseInt(ev.target.closest('.column').id),
        "title":card.shadowRoot.querySelector(".card").getElementsByTagName('h2')[0].textContent,
        "description":card.shadowRoot.querySelector(".card").getElementsByTagName('p')[0].textContent
      }
      // get 'cards' html element of target column
      const targetCardList = ev.target.closest('.column').querySelector(".cards")
      const result = await editCard(newCard)
      if(result){
        //append the card
        targetCardList.appendChild(card)
      }
      break;
    }
  }
}