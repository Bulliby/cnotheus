import XhrCards from './xhrCards.js';
import DragAndDrop from './dragAndDrop.js';

export default class CardsPage
{
    constructor() {
        this.xhrCards = new XhrCards();
        this.dragAndDrop = new DragAndDrop(this.xhrCards, this);
        this.onLoad();
        this.requestAdd = false;
    }

    onLoad() {
        this.xhrCards.getLists().then((res) => {
            res = JSON.parse(res);
            this.xhrCards.setState(res.lists);

            let data = { Cards: res.lists };
            this.refreshTemplate(data);

            let addBtn = document.getElementById('js-add');
            addBtn.addEventListener('click', this.addList.bind(this));
        });
    }

    /**
     * To have a smooth front, I first had the element in DOM and then
     * send the data to the server asynchronously, he respond me with 
     * the id of the card newly created.
     */
    addList() {
        this.requestAdd = true;
        let state = this.xhrCards.getState();
        let input = document.getElementById('js-list-name-input');
        let card = {'name': input.value, 'position': state.length + 1, 'id' : null};
        state.push(card);
        this.xhrCards.setState(state);

        let data = { Cards: state };
        this.refreshTemplate(data);
        this.xhrCards.addList(card).then(id => {
            let card = state.pop();
            card.id = Number(id); 
            state.push(card);
            this.refreshTemplate(data);
            this.requestAdd = false;
        });
    }

    refreshTemplate(data) {
        let el = document.getElementById('cardsPage');
        //lists est ici le prefix du fichier "lists.handlebars"
        var template = Handlebars.templates.lists;
        data.Cards.sort((a, b) => {
            return (a.position > b.position) ? 1 : -1;
        });
        el.innerHTML = template(data);
        // After innerHTML we loose event bindings and must redo queryselector
		this.dragAndDrop.setCards();
        this.bindEvents();
    }

	bindEvents() {
		this.dragAndDrop.eventCards();
	}

    getRequestAdd() {
        return this.requestAdd;
    }
}
