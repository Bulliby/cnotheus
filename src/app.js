import Pages from './pages.js'

window.onload = () => { 
    window.page = new Pages();
    window.page.setPage('lists-page');
    window.page.changePage();
};
