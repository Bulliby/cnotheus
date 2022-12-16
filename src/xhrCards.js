import customXhr from "./xhr.js"

export default class XhrCards
{
    constructor() {
        this.state = null;
        this.domain = process.env.URL
    }

    getLists()
    {
        return new customXhr({
            verb: "GET",
            url: `${this.domain}/list/`
        });
    }

    addList(card) {
        return new customXhr({
            verb: "POST",
            url: `${this.domain}/list/`,
            data: JSON.stringify({
                name: card.name,
                position: card.position 
            })
        });
    }

    setPositions(cards) {
        return new customXhr({
            verb: "POST",
            url: `${this.domain}/list/positions`,
            data: JSON.stringify(this.state)
        });
    }

    setState(state) {
        this.state = state;
    }

    getState() {
        return this.state;
    }
}
