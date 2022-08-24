import customXhr from "./xhr.js"

export default class Lists
{
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

    setListState(state) {
        this.state = state;
    }

    getListState() {
        return this.state;
    }

    setMaxId(id) {
        this.maxId = id;
    }

    /**
     * L'id est la seule chose que le back doit determiner. Je génère
     * le futur ID en js pour ne pas a avoir à attendre la réponse du 
     * back.
     */
    getMaxId() {
        return this.maxId;
    }

    incMaxId() {
        this.maxId += 1;
    }
}
