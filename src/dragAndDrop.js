export default class DragAndDrop
{
    constructor(xhrCards, page) {
		this.cards = null;
        this.isDragging = false;
        this.initialX = null;
        this.initialY = null;
        this.draggedEl = null;
        this.max = null;
        this.maxEl = null;
        this.origin = null;
        this.page = page;
        this.xhrCards = xhrCards;

        document.addEventListener('mousemove', e => this.mouseMove(e));
        document.addEventListener('mouseup', e => this.mouseUp(e));
    }

    mouseDown(e, el) {
        e.preventDefault();
        if (e.button != 0)
            return;
        this.isDragging = true;
        this.initialX = e.clientX + 'px';
        this.initialY = e.clientY + 'px';
        this.origin = e.currentTarget;
        this.draggedEl = this.createDraggedElement(e.currentTarget);
        document.body.append(this.draggedEl);
    }

    mouseUp(e) {
        e.preventDefault();
        if (this.isDragging === false)
            return;
        this.isDragging = false;
        if (e.target.id == 'dragged-el' === false) {
            this.maxEl == null;
            if (this.draggedEl) {
                this.draggedEl.remove();
            }
            return;
        }
        let rect = this.draggedEl.getBoundingClientRect();
        let state = this.xhrCards.getState();

        this.draggedEl.remove();
        this.drop(rect);

        this.reOrderCards((i, inc) => {
            this.cards[i - 1].dataset.listPosition += inc;
            state[i - 1]['position'] += inc;
        });

        this.xhrCards.setState(state);
        this.page.refreshTemplate({ Cards: state });

        /**
         * If we are already adding a card we can't set the
         * positions right now. We apply a delay.
         */
        let timer = setInterval(() => {
            if (!this.page.getRequestAdd()) {
                this.xhrCards.setPositions();
                clearInterval(timer);
            }
        }, 20);
    }

    reOrderCards(callback) {
        let originPos = Number(this.origin.dataset.listPosition);
        let targetPos = Number(this.maxEl.dataset.listPosition);

        if (targetPos > originPos) {
            for (let i = targetPos; i != originPos; i--) {
                callback(i, -1);
            }
        } else if (targetPos < originPos) {
            for (let i = targetPos; i != originPos; i++) {
                callback(i, +1);
            }
        }
        this.cards[originPos - 1].dataset.listPosition = targetPos;
        this.xhrCards.state[originPos - 1]['position'] = targetPos;
    }

    mouseMove(e) {
        e.preventDefault();
        if (this.isDragging == true) {
            let rect = this.draggedEl.getBoundingClientRect();
            this.draggedEl.style.visibility = 'visible';
            this.draggedEl.style.left = `${parseInt(this.draggedEl.style.left.replace('px', ''), 10) + (e.clientX - this.initialX)}px`;
            this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) + (e.clientY - this.initialY)}px`;
            this.initialX = e.clientX;
            this.initialY = e.clientY;
            if (!(rect.top >= 0 && rect.bottom < window.innerHeight)) {
                this.animateScroll(e);
            }
        }
    }

    /**
     * For a smooth animation, when we move the card outside
     * the viewport.
     */
    animateScroll() { 
        let start = Date.now();

        let timer = setInterval(function() {
            let timePassed = Date.now() - start;
            let rect = this.draggedEl.getBoundingClientRect();

            if (rect.top < 0 && scrollY > 0) {
                window.scroll(0, window.scrollY - 1);
                this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) - (1)}px`;
            } else if (window.scrollY + window.innerHeight != document.body.scrollHeight && rect.bottom > window.innerHeight) {
                window.scroll(0, window.scrollY + 1);
                this.draggedEl.style.top = `${parseInt(this.draggedEl.style.top.replace('px', ''), 10) + (1)}px`;
            } else {
                clearInterval(timer);
            }

        }.bind(this), 20);
    }

    createDraggedElement(target) {
        let rect = target.getBoundingClientRect();
        let clonedNode = target.cloneNode(true);
        clonedNode.setAttribute("id", "dragged-el");
        clonedNode.setAttribute("class", "list-name-container");
        clonedNode.style.left = rect.left + window.scrollX + 'px';
        clonedNode.style.top = rect.top + window.scrollY + 'px';
        clonedNode.style.width = rect.width + 'px';
        
        return clonedNode;
    }

    /**
     * Here we calculate for each corner which one is overlapping
     * the more another card.
     */
    drop(rect) {
        let elDraggedX = rect.left;
        let elDraggedY = rect.top;
        let elDraggedX2 = rect.right;
        let elDraggedY2 = rect.bottom;
            
        this.getCards().forEach((el) => {
            let rect = el.getBoundingClientRect();
            this.checkCornertTopLeft(elDraggedX, elDraggedY, rect, el);
            this.checkCornertTopRight(elDraggedX2, elDraggedY, rect, el);
            this.checkCornertBottomLeft(elDraggedX, elDraggedY2, rect, el);
            this.checkCornertBottomRight(elDraggedX2, elDraggedY2, rect, el);
        });
        this.max = 0;
    }

    roundingCoordinates([left, right, top, bottom]) {
        return [Math.floor(left), Math.ceil(right), Math.floor(top), Math.ceil(bottom)]
    }

    checkCornertTopLeft(elDraggedX, elDraggedY, rect, el)
    {
        const [left, right, top, bottom] = this.roundingCoordinates([rect.left, rect.right, rect.top, rect.bottom]);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
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
        const [left, right, top, bottom] = this.roundingCoordinates([rect.left, rect.right, rect.top, rect.bottom]);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
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
        const [left, right, top, bottom] = this.roundingCoordinates([rect.left, rect.right, rect.top, rect.bottom]);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
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
        const [left, right, top, bottom] = this.roundingCoordinates([rect.left, rect.right, rect.top, rect.bottom]);

        if (elDraggedX >= left && elDraggedX <= right && elDraggedY >= top && elDraggedY <= bottom) 
        {
            let X = elDraggedX - rect.left;
            let Y = elDraggedY - rect.top;
            let XxY = X * Y;
            if (XxY > this.max)  {
                this.max = XxY;
                this.maxEl = el;
            }
        }
    }

    eventCards() {
        this.getCards().forEach(el => {
            el.addEventListener('mousedown', e => this.mouseDown(e, el));
        });

        /**
         * We block scroll on dragging mode.
         */
        document.addEventListener('wheel', (e) => {
            if (this.isDragging == true) {
                e.stopPropagation();
                e.preventDefault();
            }
        }, { 'capture' : true, 'once': false, 'passive': false });
    }

    getCards() {
		return this.cards;
    }

	setCards(cards) {
        this.cards = document.querySelectorAll('.list-name-container');

		return this;
	}
}
