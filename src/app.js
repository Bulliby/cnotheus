import Lists  from "./lists.js"

class App 
{
    constructor() {
        this.lists = new Lists();
        this.lists.getLists().then((res) => {
            res = JSON.parse(res);
            this.lists.setListState(res.lists);
            this.lists.setMaxId(res.maxId);

            let data = { Lists: res.lists };
            this.refreshTemplate(data, 'lists-template');
            this.addBtn = document.getElementById('js-add');
            this.addBtn.addEventListener('click', this.addList.bind(this));
        });
    }

    refreshTemplate(data, page) {
        let el = document.getElementById(page);
        //lists est ici le prefix du fichier "lists.handlebars"
        var template = Handlebars.templates.lists;
        el.innerHTML = template(data);
    }

    addList() {
        let state = this.lists.getListState();
        let input = document.getElementById('js-list-name-input');
        state.push({'id': this.lists.getMaxId(), 'name': input.value });
        this.lists.setListState(state);

        let data = { Lists: state };
        this.refreshTemplate(data, 'lists-template');
    }
}

onload = (event) => { 
    new App();
};
