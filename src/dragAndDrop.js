export default class DragAndDrop
{
    constructor(lists) {
        this.lists = lists;    
        this.isDragging = false;
        this.initialX = null;
        this.initialY = null;
        this.draggedEl = null;
        this.max = null;
        this.maxEl = null;

        this.bind();
        document.addEventListener('mousemove', e => this.mouseMove(e));
        document.addEventListener('mouseup', e => this.mouseUp(e));
    }

    bind() {
        this.lists = document.querySelectorAll('.list-name-container');

        this.lists.forEach(el => {
            el.addEventListener('mousedown', e => this.mouseDown(e, el));
        });

    }

    mouseDown(e, el) {
        e.preventDefault();
        this.isDragging = true;
        this.initialX = e.clientX + 'px';
        this.initialY = e.clientY + 'px';
        this.createDraggedElement(e.currentTarget);
    }

    mouseUp(e) {
        e.preventDefault();
        this.isDragging = false;
        if (e.target.id == 'dragged-el' === false) {
            this.maxEl == null;
            this.draggedEl.remove();
            return;
        }
        let rect = this.draggedEl.getBoundingClientRect();
        this.draggedEl.remove();
        this.drop(rect);
    }


    mouseMove(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.isDragging == true) {
            let cursorPositionX = e.clientX;
            let cursorPositionY = e.clientY;
            this.draggedEl.style.visibility = 'visible';
            this.draggedEl.style.left = `${parseInt(this.draggedEl.style.left.replace('px', ''), 10) + (cursorPositionX - this.initialX)}px`;
            this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) + (cursorPositionY - this.initialY)}px`;
            this.initialX = cursorPositionX;
            this.initialY = cursorPositionY;
            //while  (rect.top < 0 && window.scrollY > 0)
			let start = Date.now(); // remember start time

            let timer = setInterval(function() {
                let timePassed = Date.now() - start;
                let rect = this.draggedEl.getBoundingClientRect();

                if ((rect.top >= 0 && rect.bottom < window.innerHeight)) {
                    console.log('biib');
                    clearInterval(timer);
                    return;
                } else if (rect.top < 0 && scrollY > 0) {
                    console.log('top');
                    window.scroll(0, window.scrollY - 1);
                    this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) - (1)}px`;
                } else if (rect.bottom <= document.body.scrollHeight && rect.bottom > window.innerHeight) {
                    console.log(document.body.scrollHeight);
                    console.log(rect.bottom);
                    console.log('down');
                    window.scroll(0, window.scrollY + 1);
                    this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) + (1)}px`;
                } else {
                    console.log('out');
                    clearInterval(timer);
                }
                // } else if (window.scrollY > 0 && rect.top < 0) {
                //     console.log('up');
                //     window.scroll(0, window.scrollY - 1);
                //     this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) - (1)}px`;
                // } else if (window.scrollY < window.innerHeight && rect.bottom > window.innerHeight){
                //     console.log('down');
                //     window.scroll(0, window.scrollY + 1);
                //     this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) + (1)}px`;
                // } else {
                //     clearInterval(timer);
                //     console.log('baby');
                // }
            }.bind(this), 20);
            // if (rect.bottom > window.innerHeight && (window.scrollY + window.innerHeight) < document.body.scrollheight) {
            //     window.scroll(0, window.scrollY + 5);
            //     this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) + (5)}px`;
            // }
            // if (rect.top < 0 && window.scrollY > 0) {
            //     window.scroll(0, window.scrollY - 5);
            //     this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) - (5)}px`;
            // }
        }
    }

    createDraggedElement(target) {
        let rect = target.getBoundingClientRect();
        let name = document.createElement('span');
        name.setAttribute('class', 'list-name');
        const nameCopy = target.querySelector('.list-name').innerHTML;
        name.innerHTML = nameCopy;
        this.draggedEl = document.createElement("div");
        this.draggedEl.setAttribute("id", "dragged-el");
        this.draggedEl.setAttribute("class", "list-name-container");
        this.draggedEl.style.left = rect.left + window.scrollX + 'px';
        this.draggedEl.style.top = rect.top + window.scrollY + 'px';
        this.draggedEl.style.width = rect.width + 'px';
        this.draggedEl.append(name);
        document.body.append(this.draggedEl);
    }

    drop(rect) {
        let elDraggedX = rect.left;
        let elDraggedY = rect.top;
        let elDraggedX2 = rect.right;
        let elDraggedY2 = rect.bottom;
            
        this.lists.forEach((el) => {
            let rect = el.getBoundingClientRect();
            this.checkCornertTopLeft(elDraggedX, elDraggedY, rect, el);
            this.checkCornertTopRight(elDraggedX2, elDraggedY, rect, el);
            this.checkCornertBottomLeft(elDraggedX, elDraggedY2, rect, el);
            this.checkCornertBottomRight(elDraggedX2, elDraggedY2, rect, el);
        });
        console.log(this.maxEl);
        // console.log(this.max);
        this.max = 0;
    }

    checkCornertTopLeft(elDraggedX, elDraggedY, rect, el)
    {
        let top = Math.floor(rect.top);
        let bottom = Math.ceil(rect.bottom);
        let left = Math.floor(rect.left);
        let right = Math.ceil(rect.right);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
            // console.log(left);
            // console.log(right);
            // console.log(elDraggedY);
            // console.log(elDraggedX);
            let X = rect.right - elDraggedX;
            let Y = rect.bottom - elDraggedY;
            let XxY = X * Y;
            if (XxY > this.max)  {
                this.max = XxY;
                this.maxEl = el;
            }
        }
    }

    checkCornertTopRight(elDraggedX, elDraggedY, rect, el)
    {
        let top = Math.floor(rect.top);
        let bottom = Math.ceil(rect.bottom);
        let left = Math.floor(rect.left);
        let right = Math.ceil(rect.right);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
            // console.log(left);
            // console.log(right);
            // console.log(elDraggedY);
            // console.log(elDraggedX);
            let X = elDraggedX - rect.left;
            let Y = rect.bottom - elDraggedY;
            let XxY = X * Y;
            if (XxY > this.max)  {
                this.max = XxY;
                this.maxEl = el;
            }
        }
    }

    checkCornertBottomLeft(elDraggedX, elDraggedY, rect, el)
    {
        let top = Math.floor(rect.top);
        let bottom = Math.ceil(rect.bottom);
        let left = Math.floor(rect.left);
        let right = Math.ceil(rect.right);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
            // console.log(left);
            // console.log(right);
            // console.log(elDraggedY);
            // console.log(elDraggedX);
            let X = rect.right - elDraggedX;
            let Y = elDraggedY - rect.top;
            let XxY = X * Y;
            if (XxY > this.max)  {
                this.max = XxY;
                this.maxEl = el;
            }
        }
    }

    checkCornertBottomRight(elDraggedX, elDraggedY, rect, el)
    {
        let top = Math.floor(rect.top);
        let bottom = Math.ceil(rect.bottom);
        let left = Math.floor(rect.left);
        let right = Math.ceil(rect.right);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
            // console.log(left);
            // console.log(right);
            // console.log(elDraggedY);
            // console.log(elDraggedX);
            let X = elDraggedX - rect.left;
            let Y = elDraggedY - rect.top;
            let XxY = X * Y;
            if (XxY > this.max)  {
                this.max = XxY;
                this.maxEl = el;
            }
        }
    }
}
