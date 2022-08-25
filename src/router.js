import ListsPage  from "./listsPage.js"
import NotesPage  from "./notesPage.js"

export default class Router 
{
    constructor() {
        this.routerId = null;
    }

    changePage() {
        document.querySelectorAll('section').forEach(el => {
            el.style.display = "none";
        });
        document.getElementById(this.routerId).style.display = "block";

        switch (this.routerId)  {
            case 'lists-page':
                new ListsPage();
                break;
            case 'notes-page':
                new NotesPage();
                break;
        }
    }
}
