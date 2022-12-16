import CardsPage from './cardsPage.js'

/*
 * Custom routeur, not part of the project anymore
 */
export default class Pages
{
    constructor() {
        document.querySelectorAll('section').forEach(el => {
            el.style.display = "none";
        });

		this.pages = { 'cardsPage' : new CardsPage() };
		this.getPage('cardsPage');
    }

    changePage() {
        document.querySelectorAll('section').forEach(el => {
            el.style.display = "none";
        });
        document.getElementById(this.pageId).style.display = "block";
    }

    setPage(page) {
        this.pageId = page;

        return this;
    }

	getPage(page) {
		return this.pages[page];
	}
}
