import customXhr from "./xhr.js"

export default class Lists
{
    constructor() {
        this.listSelected = 1;
        this.state = null;
         // L'id est la seule chose que le back doit determiner. Je génère
         // le futur ID en js pour ne pas a avoir à attendre la réponse du back.
        this.maxId = null;
        this.projects = null;
    }

    getLists()
    {
        return new customXhr({
            verb: "GET",
            url: "http://projects/project/list"
        });
    }

    addList(name) {
        if (name.length == 0) {
            alert('validation');
            return;
        }
        return new customXhr({
            verb: "POST",
            url: "http://projects/project/list/add",
            data: JSON.stringify({
                name: name
            })
        });
    }

    getOneList(id) {
        return new customXhr({
            verb: "GET",
            url: "http://projects/project/list/"+id,
        });
    }

    fetchProjects() {
        return this.getOneList(this.listSelected).then(res => {
            this.projects = res.projects;
        });
    }
}
