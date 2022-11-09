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

    addList(card) {
        if (card.name.length == 0) {
            alert('validation');
            return;
        }
        return new customXhr({
            verb: "POST",
            url: `${this.domain}/list/`,
            data: JSON.stringify({
                name: card.name,
                position: card.position 
            })
        });
    }

    getOneList(id) {
        return new customXhr({
            verb: "GET",
            url: `${this.domain}/project/list/${id}/`,
        });
    }

    setPositions(cards) {
        return new customXhr({
            verb: "POST",
            url: `${this.domain}/list/positions`,
            data: JSON.stringify(this.state)
        });
    }
}
