import Page  from "./page.js"
import Lists  from "./lists.js"

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
            this.lists.maxId = res.maxId;

            let data = { Lists: res.lists };
            this.refreshTemplate(data, 'lists-template');

            let addBtn = document.getElementById('js-add');
            addBtn.addEventListener('click', this.addList.bind(this));
            document.querySelectorAll('.list-name-container').forEach(el => {
                el.addEventListener('click', e => this.selectList(e));
            });
        });
    }

    addList() {
        let state = this.lists.state;
        let input = document.getElementById('js-list-name-input');
        this.lists.maxId += 1;
        state.push({'id': this.lists.maxId, 'name': input.value });
        this.lists.state = state;

        let data = { Lists: state };
        this.refreshTemplate(data, 'lists-template');
        this.lists.addList(input.value);
        document.querySelector('[data-list-id="'+this.lists.maxId+'"]')
            .addEventListener('click', e => this.selectList(e));
    }

    selectList(e) {
        let list = e.currentTarget;
        this.lists.listSelected = list.dataset.listId;
        window.router.routerId = 'notes-page';
        window.router.changePage();
        //this.lists.fetchProjects();
    }
}
