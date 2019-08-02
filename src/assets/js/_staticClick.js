export default class StaticClick{
    constructor(func) {
        this.StaticClickFunction = func;
    }
    addEvent(targetElement) {
        this.targetElement = targetElement;

        this.clickStartFunction_binded = this.clickStartFunction.bind(this);
        this.clickEndFunction_binded   = this.clickEndFunction.bind(this);

        this.addClickStartEvent(targetElement, this.clickStartFunction_binded);
    }
    removeEvent(targetElement) {
        this.removeClickStartEvent(targetElement, this.clickStartFunction_binded);
        this.removeClickEndEvent(targetElement,   this.clickEndFunction_binded);
    }
    getPageX(e) {
        return e.pageX;
    }
    clickEndFunction(e) {
        this.removeClickEndEvent(this.targetElement, this.clickEndFunction_binded);
        this.addClickStartEvent(this.targetElement,  this.clickStartFunction_binded);
        
        const PageXWhenclickEnd = e.pageX;
        if (PageXWhenclickEnd === this.PageXwhenclickStart) this.StaticClickFunction(e);
    }
    clickStartFunction(e) {
        this.removeClickStartEvent(this.targetElement, this.clickStartFunction_binded);
        this.addClickEndEvent(this.targetElement,      this.clickEndFunction_binded);
        
        this.PageXwhenclickStart = this.getPageX(e);
    }
    addClickStartEvent(targetElement,    func) {
        targetElement.addEventListener('mousedown',  func, false);
        targetElement.addEventListener('touchstart', func, false);
    }
    removeClickStartEvent(targetElement, func) {
        targetElement.removeEventListener('mousedown',  func, false);
        targetElement.removeEventListener('touchstart', func, false);
    }
    addClickEndEvent(targetElement,      func) {
        targetElement.addEventListener('mouseup',    func, false);
        targetElement.addEventListener('touchend',   func, false);
        targetElement.addEventListener('mouseleave', func, false);
        targetElement.addEventListener('touchleave', func, false);
    }
    removeClickEndEvent(targetElement,    func) {
        targetElement.removeEventListener('mouseup',    func, false);
        targetElement.removeEventListener('touchend',   func, false);
        targetElement.removeEventListener('mouseleave', func, false);
        targetElement.removeEventListener('touchleave', func, false);
    }
}