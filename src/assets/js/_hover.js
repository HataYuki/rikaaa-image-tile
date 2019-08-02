export default class hover{
    constructor(func) {
        this.hoverFunction = func;
    }
    addEvent(targetElement) {
        this.targetElement = targetElement;

        this.mousePosWhenHoverStart = {
            x: 0,
            y: 0,
        }

        this.mouseEnterFunction_binded = this.mouseEnterFuntion.bind(this);
        this.mouseMoveFunction_binded = this.mouseMoveFunction.bind(this);
        this.mouseOutFunction_binded = this.mouseOutFunction.bind(this);

        this.addMouseEnterEvent(targetElement, this.mouseEnterFunction_binded);
    }
    removeEvent(targetElement) {
        this.removeMouseEnterEvent(targetElement, this.mouseEnterFunction_binded);
        this.removeMouseMoveEvent(targetElement, this.mouseMoveFunction_binded);
        this.removeMouseOutEvent(targetElement, this.mouseOutFunction_binded);
    }
    mouseEnterFuntion(e) {
        this.removeMouseEnterEvent(this.targetElement, this.mouseEnterFunction_binded);
        this.addMouseOutEvent(this.targetElement, this.mouseOutFunction_binded);
        this.addMouseMoveEvent(this.targetElement, this.mouseMoveFunction_binded);

        this.mousePosWhenHoverStart = {
            x: e.offsetX,
            y: e.offsetY,
        }

        const ishover = true;
        this.hoverFunction(e, ishover);
    }
    mouseMoveFunction(e) {
        const currentMousePos = {
            x: e.offsetX,
            y: e.offsetY,
        }
        const mouseMoveAmount = {
            x: currentMousePos.x - this.mousePosWhenHoverStart.x,
            y: currentMousePos.y - this.mousePosWhenHoverStart.y,
        }
        
        if(this.mouseMoveFunctionAble) this.functionWhenMouseMove(e, mouseMoveAmount, currentMousePos);
    }
    mouseOutFunction(e) {
        this.removeMouseOutEvent(this.targetElement, this.mouseOutFunction_binded);
        this.removeMouseMoveEvent(this.targetElement, this.mouseMoveFunction_binded);
        this.addMouseEnterEvent(this.targetElement, this.mouseEnterFunction_binded);

        this.mousePosWhenHoverStart = {
            x: 0,
            y: 0,
        }
        
        const ishover = false;
        this.hoverFunction(e, ishover);
    }
    setMouseMoveFunc(func) {
        this.mouseMoveFunctionAble = (typeof func === 'function') ? true : false;
        this.functionWhenMouseMove = func;

        return this;
    }
    addMouseEnterEvent(targetElement,    func) {
        targetElement.addEventListener('mouseenter',  func, false);
    }
    removeMouseEnterEvent(targetElement, func) {
        targetElement.removeEventListener('mouseenter', func, false);
    }
    addMouseOutEvent(targetElement,      func) {
        targetElement.addEventListener('mouseout', func, false);
    }
    removeMouseOutEvent(targetElement, func) {
        targetElement.removeEventListener('mouseout', func, false);
    }
    addMouseMoveEvent(targetElement, func) {
        targetElement.addEventListener('mousemove', func, false);
    }
    removeMouseMoveEvent(targetElement, func) {
        targetElement.removeEventListener('mousemove', func, false);
    }
}