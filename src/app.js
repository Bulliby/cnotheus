import Lists  from "./lists.js"

let lists = new Lists();

lists.getLists().then((res) => {
    document.stateList = JSON.parse(res);
    var template = Handlebars.templates.lists;
    document.getElementById('lists-collection').innerHTML = template({ Lists: document.stateList})
});
