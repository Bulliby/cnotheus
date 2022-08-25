export default class Page
{
    refreshTemplate(data, page) {
        //page is the div where compiled template is inserted in DOM
        let el = document.getElementById(page);
        //lists est ici le prefix du fichier "lists.handlebars"
        var template = Handlebars.templates.lists;
        el.innerHTML = template(data);
    }

    /**
     * Used to hide and show specified block and act like a router
     */
    renderPage() {
        document.querySelectorAll('section').forEach(el => {
            el.style.display = "none";
        });
        document.getElementById(this.routerId).style.display = "block";
    }
}

