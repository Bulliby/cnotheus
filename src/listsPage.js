import Page  from "./page.js"
import Lists  from "./lists.js"
import DragAndDrop  from "./dragAndDrop.js"

export default class ListsPage extends Page
{
    constructor() {
        super();
        this.lists = new Lists();
        this.onLoad();
    }

    onLoad() {
        this.lists.getLists().then((res) => {
            res = JSON.parse(res);
            this.lists.state = res.lists;

            let data = { Lists: res.lists };
            this.refreshTemplate(data, 'lists-template');

            let addBtn = document.getElementById('js-add');
            addBtn.addEventListener('click', this.addList.bind(this));
            let listElements = document.querySelectorAll('.list-name-container');
            listElements.forEach(el => {
                el.addEventListener('dblclick', e => this.selectList(e));
            });

            new DragAndDrop(listElements);
        });
    }

    addList() {
        let state = this.lists.state;
        let input = document.getElementById('js-list-name-input');
        state.push({'name': input.value });
        this.lists.state = state;

        let data = { Lists: state };
        this.refreshTemplate(data, 'lists-template');
        this.lists.addList(input.value).then(id => {
            let el = state.pop();
            el.id = id; 
            state.push(el);
            this.refreshTemplate(data, 'lists-template');

            let newElement = document.querySelector('[data-list-id="'+id+'"]');
            newElement.addEventListener('dblclick', e => this.selectList(e));
            new DragAndDrop([newElement]);
        });
    }

    selectList(e) {
        let list = e.currentTarget;
        this.lists.listSelected = list.dataset.listId;
        window.router.routerId = 'notes-page';
        window.router.changePage();
        //this.lists.fetchProjects();
    }
}
