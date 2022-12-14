export default class customXhr
{
    constructor(params) 
    {
        this.params = params;
        this.xhr = new XMLHttpRequest();
        return this.returnPromise();
    }

    returnPromise() {
        return new Promise((resolve, reject) => {
            this.xhr.open(this.params.verb, this.params.url);
            if (process.env.ENV == 'prod') {
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                this.xhr.withCredentials = true;
            }
            this.xhr.onload = () => {
                if (this.xhr.status >= 200 && this.xhr.status < 300) {
                    resolve(this.xhr.response);
                } else {
                    reject("fail");
                }
            }
            this.xhr.onerror = () => {
                reject("fail");
            }
            this.xhr.send(this.params.data);
        });
    }
}
