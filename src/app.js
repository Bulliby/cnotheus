import Router from './router.js'

window.onload = (event) => { 
    window.router = new Router();
    window.router.routerId = 'lists-page';
    window.router.changePage();
};
