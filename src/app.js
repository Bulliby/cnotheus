import Lists  from "./lists.js"

let lists = new Lists();

let refreshTemplate = (data) => {
    let el = document.getElementById('lists-template');
    var template = Handlebars.templates.lists;
    el.innerHTML = template(data);
};

lists.getLists().then((res) => {
    document.stateList = JSON.parse(res);
    let data = { Lists: document.stateList};
    refreshTemplate(data);
});

document.getElementById('js-add').addEventListener('click', (e) => {
    let input = document.getElementById('js-list-name-input');
    lists.addList(input.value).then(lists.getLists).then((res) => {
        document.stateList = JSON.parse(res);
        let data = { Lists: document.stateList};
        refreshTemplate(data);
    });
});

