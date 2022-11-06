import XhrCards from './xhrCards.js';
import DragAndDrop from './dragAndDrop.js';

export default class CardsPage
{
    constructor() {
        this.xhrCards = new XhrCards();
        this.dragAndDrop = new DragAndDrop();
        this.onLoad();
    }

    onLoad() {
        this.xhrCards.getLists().then((res) => {
            res = JSON.parse(res);
            this.xhrCards.state = res.lists;

            let data = { Lists: res.lists };
            this.refreshTemplate(data);

            let addBtn = document.getElementById('js-add');
            addBtn.addEventListener('click', this.addList.bind(this));
            let listElements = document.querySelectorAll('.list-name-container');
        });
    }

    addList() {
        let state = this.xhrCards.state;
        let input = document.getElementById('js-list-name-input');
        state.push({'name': input.value });
        this.xhrCards.state = state;

        let data = { Lists: state };
        this.refreshTemplate(data);
        this.xhrCards.addList(input.value).then(id => {
            let el = state.pop();
            el.id = id; 
            state.push(el);
            this.refreshTemplate(data);
        });
    }

    selectList(e) {
        let list = e.currentTarget;
        this.xhrCards.listSelected = list.dataset.listId;
        window.page.setPage('notesPage');
        window.page.changePage();
    }

    /**
     * page is the div where compiled template is inserted in DOM
     */
    refreshTemplate(data) {
        let el = document.getElementById('cardsPage');
        //lists est ici le prefix du fichier "lists.handlebars"
        var template = Handlebars.templates.lists;
        el.innerHTML = template(data);
		this.dragAndDrop.setCards();
        this.bindEvents();
    }

	bindEvents() {
        this.dragAndDrop.getCards().forEach(el => {
            el.addEventListener('dblclick', e => this.selectList(e));
		});
		this.dragAndDrop.eventCards();
	}
}
