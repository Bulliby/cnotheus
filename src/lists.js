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

    addList() {
        return new customXhr({
            verb: "POST",
            url: "http://projects/project/list/add",
            data: JSON.stringify({
                name: "Depuis le js"
            })
        });
    }
}
