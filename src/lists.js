import customXhr from "./xhr.js"

export default class Lists
{
    constructor() {
        this.listSelected = 1;
        this.state = null;
        this.domain = "http://notheus"
        this.projects = null;
    }

    getLists()
    {
        return new customXhr({
            verb: "GET",
            url: `${this.domain}/project/list`
        });
    }

    addList(name) {
        if (name.length == 0) {
            alert('validation');
            return;
        }
        return new customXhr({
            verb: "POST",
            url: `${this.domain}/project/list/add`,
            data: JSON.stringify({
                name: name
            })
        });
    }

    getOneList(id) {
        return new customXhr({
            verb: "GET",
            url: `${this.domain}/project/list/${id}`,
        });
    }

    // fetchProjects() {
    //     return this.getOneList(this.listSelected).then(res => {
    //         this.projects = res.projects;
    //     });
    // }
}
