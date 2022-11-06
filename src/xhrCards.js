import customXhr from "./xhr.js"

export default class XhrCards
{
    constructor() {
        this.listSelected = 1;
        this.state = null;
        this.domain = process.env.URL
        this.projects = null;
    }

    getLists()
    {
        return new customXhr({
            verb: "GET",
            url: `${this.domain}/list/`
        });
    }

    addList(name) {
        if (name.length == 0) {
            alert('validation');
            return;
        }
        return new customXhr({
            verb: "POST",
            url: `${this.domain}/list/`,
            data: JSON.stringify({
                name: name
            })
        });
    }

    getOneList(id) {
        return new customXhr({
            verb: "GET",
            url: `${this.domain}/project/list/${id}/`,
        });
    }
}
