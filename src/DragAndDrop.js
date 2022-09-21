export default class DragAndDrop
{
    constructor(lists) {
        this.lists = lists;    
        this.isDragging = false;
        this.initialX = null;
        this.initialY = null;
        this.draggedEl = null;

        this.lists.forEach(el => {
            el.addEventListener('mousedown', e => this.mouseDown(e, el));
            document.addEventListener('mousemove', e => this.mouseMove(e));
        });
    }

    mouseDown(e, el) {
        e.preventDefault();
        this.isDragging = true;
        this.initialX = e.clientX + 'px';
        this.initialY = e.clientY + 'px';
        this.createDraggedElement(e.currentTarget);
        document.addEventListener('mouseup', e => this.mouseUp(e));
    }

    mouseUp(e) {
        console.log('mouseup');
        e.preventDefault();
        this.isDragging = false;
        this.draggedEl.remove();
    }

    mouseMove(e) {
        e.preventDefault();
        if (this.isDragging == true) {
            let cursorPositionX = e.clientX;
            let cursorPositionY = e.clientY;
            this.draggedEl.style.visibility = 'visible';
            this.draggedEl.style.left = `${parseInt(this.draggedEl.style.left.replace('px', ''), 10) + (cursorPositionX - this.initialX)}px`;
            this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) + (cursorPositionY - this.initialY)}px`;
            this.initialX = cursorPositionX;
            this.initialY = cursorPositionY;
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
}
