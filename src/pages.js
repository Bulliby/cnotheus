import CardsPage from './cardsPage.js'
import NotesPage from './notesPage.js'

export default class Pages
{
    constructor() {
        document.querySelectorAll('section').forEach(el => {
            el.style.display = "none";
        });

		this.pages = { 'cardsPage' : new CardsPage(), 'notesPage' : new NotesPage() };
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
