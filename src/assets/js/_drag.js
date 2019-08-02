import onebang from './_Onebang';
export default class Drag {
    constructor(func) {
        this.functionWhenDraging = func;

        this.isFunctionWhenDragStart = false;
        this.isFunctionWhenDragEnd   = false;
        
        this.dragStartFuncOnec = null;

        this.amountOfMouseMovedbyPixel = {
            x: 0,
            y: 0,
        }
    }
    addEvent(targetElement) {
        this.targetElement = targetElement;

        this.dragStartFunction_binded = this.dragStartFunction.bind(this);
        this.dragingFunction_binded   = this.dragingFunction.bind(this);
        this.dragEndFunction_binded   = this.dragEndFunction.bind(this);
        
        this.addDragStartEvent(this.targetElement, this.dragStartFunction_binded);
    }
    removeEvent(targetElement) {
        this.removeDragStartEvent(targetElement, this.dragStartFunction_binded);
        this.removeDragingEvent(window,          this.dragingFunction_binded);
        this.removeDragEndEvent(window,          this.dragEndFunction_binded);
    }
    setDragStartFunc(func) {
        this.isFunctionWhenDragStart = (typeof func === 'function') ? true : false;
        this.functionWhenDragStart   = func;
        return this;
    }
    setDragEndFunc(func) {
        this.isFunctionWhenDragEnd   = (typeof func === 'function') ? true : false;
        this.functionWhenDragEnd     = func;
        return this;
    }
    dragStartFunction(e) {
        e.preventDefault();
        this.removeDragStartEvent(this.targetElement, this.dragStartFunction_binded);
        this.addDragingEvent(window,                  this.dragingFunction_binded);
        this.addDragEndEvent(window,                  this.dragEndFunction_binded);

        this.amountOfMouseMovedbyPixel.x = 0;
        this.amountOfMouseMovedbyPixel.y = 0;

        this.mousePositionWhenDragStart = {
            x:e.pageX,
            y:e.pageY,
        }

        if (this.isFunctionWhenDragStart) {
            // this.functionWhenDragStart(this.targetElement, this.mousePositionWhenDragStart);
            this.dragStartFuncOnec = onebang(this.functionWhenDragStart);
        }
    }
    dragingFunction(e) {
        const currentMousePosition = {
            x: e.pageX,
            y: e.pageY,
        }
        this.amountOfMouseMovedbyPixel = {
            x: currentMousePosition.x - this.mousePositionWhenDragStart.x,
            y: currentMousePosition.y - this.mousePositionWhenDragStart.y,
        } 

        if (this.amountOfMouseMovedbyPixel.x === 0 && this.amountOfMouseMovedbyPixel.y === 0) return false;

        if (this.dragStartFuncOnec !== null) this.dragStartFuncOnec(this.targetElement, this.mousePositionWhenDragStart);
         
        this.functionWhenDraging(e, this.mousePositionWhenDragStart,this.amountOfMouseMovedbyPixel);
    }
    dragEndFunction(e) {
        e.preventDefault();
        this.addDragStartEvent(this.targetElement, this.dragStartFunction_binded);
        this.removeDragingEvent(window,            this.dragingFunction_binded);
        this.removeDragEndEvent(window,            this.dragEndFunction_binded); 
        
        if (this.amountOfMouseMovedbyPixel.x === 0 && this.amountOfMouseMovedbyPixel.y === 0) return false;

        if (this.isFunctionWhenDragEnd) {
            this.functionWhenDragEnd(this.targetElement, this.mousePositionWhenDragStart, this.amountOfMouseMovedbyPixel);
        }
        
        if (this.isFunctionWhenDragStart) {
            this.dragStartFuncOnec = onebang(this.functionWhenDragStart);
        }
    }
    addDragingEvent(targetElement, func) {
        targetElement.addEventListener('mousemove', func, false);
        targetElement.addEventListener('touchmove', func, false);
    }
    removeDragingEvent(targetElement, func) {
        targetElement.removeEventListener('mousemove', func, false);
        targetElement.removeEventListener('touchmove', func, false);
    }
    addDragStartEvent(targetElement, func) {
        targetElement.addEventListener('mousedown',  func, false);
        targetElement.addEventListener('touchstart', func, false);
    }
    removeDragStartEvent(targetElement, func) {
        targetElement.removeEventListener('mousedown',  func, false);
        targetElement.removeEventListener('touchstart', func, false);
    }
    addDragEndEvent(targetElement, func) {
        targetElement.addEventListener('mouseup',    func, false);
        targetElement.addEventListener('touchend',   func, false);
        targetElement.addEventListener('mouseleave', func, false);
        targetElement.addEventListener('touchleave', func, false);
    }
    removeDragEndEvent(targetElement, func) {
        targetElement.removeEventListener('mouseup',    func, false);
        targetElement.removeEventListener('touchend',   func, false);
        targetElement.removeEventListener('mouseleave', func, false);
        targetElement.removeEventListener('touchleave', func, false);
    }
}