import map from '../assets/js/_Map';
import constrain from '../assets/js/_Constrain';
import onebang from '../assets/js/_Onebang';
import Ease from '../assets/js/_Ease';
import StaticClick from '../assets/js/_staticClick';
import Drag from '../assets/js/_drag';
import Hover from '../assets/js/_hover';
import valueObserver from '../assets/js/_ValueObserver';

import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import rikaaaIntersectionObserver from '../assets/js/rikaaa-IntersectionWatcher';
import '../assets/js/Array.prototype.fillter';
import '../assets/js/Array.prototype.fill'
import '../assets/js/Array.prototype.keys';

const _css = '${{{src/webcomponents/webcomponent.scss}}}';
const _style = `<style>${_css}</style>`;
const _shadowdomHTML = `
    ${_style}
    <div class="canvas-overlay">
        <div class="gide-ui">
            <div class="gide-wrap top-end-gide"><div class="gide-inner"><div class="bar top-end-gide-bar"></div></div></div>
            <div class="gide-wrap right-end-gide"><div class="gide-inner"><div class="bar right-end-gide-bar"></div></div></div>
            <div class="gide-wrap bottom-end-gide"><div class="gide-inner"><div class="bar bottom-end-gide-bar"></div></div></div>
            <div class="gide-wrap left-end-gide"><div class="gide-inner"><div class="bar left-end-gide-bar"></div></div></div>
        </div>
    </div>
    <canvas>
`;
const template = document.createElement('template');
template.id = 'rikaaaimagetile';
template.innerHTML = _shadowdomHTML;
if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-image-tile');

const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export default class rikaaaimagetile extends HTMLElement {
    constructor() {
        super();
        if (window.ShadyCSS) ShadyCSS.styleElement(this);
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.srcArrayOfImage = [];
        this.loadedImageData = null
        this.isLoadedMainData = false;
        this.isTryLoadMainData = false;

        this.row = 4;
        this.indexOfSelectedTile = 0;
        this.duration = 500;
        this.loadTiming = '100px 0px 100px 0px';
        this.zoomAble = true;
        this.dragAble = true;
        this.hoverAble = true;
        this.isZoomedStart = false;
        this.opacityOfSelected = 0.7;
        this.tileBackGroundColor = 'rgba(255,255,255,1)';

        this.zoomEase = new Ease();
        this.easeTypeOfZoomIn = 'ease-in-out';
        this.easeTypeOfZoomOut = 'ease-in-out';
        this.easeTypeOfTileShift = 'ease-in-out';

        this.resolution = window.devicePixelRatio || 1;

        this.clickPosition = {
            x: 0,
            y: 0,
        }

        this.isApplyOffsetInDrawLoop = true;

        this.zoomRatio = 0;
        
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.shadowRoot.querySelector('canvas').getContext('2d');

        this.canvasOverlay = this.shadowRoot.querySelector('.canvas-overlay');
        this.gideUi = this.shadowRoot.querySelector('.gide-ui');
        this.gidebarOfTop = this.shadowRoot.querySelector('.top-end-gide-bar');
        this.gidebarOfBottom = this.shadowRoot.querySelector('.bottom-end-gide-bar');
        this.gidebarOfRight = this.shadowRoot.querySelector('.right-end-gide-bar');
        this.gidebarOfLeft = this.shadowRoot.querySelector('.left-end-gide-bar');

        if (!window.IntersectionObserver && !window.WcRikaaaIntersectionObserver) {
            Object.defineProperty(window, 'WcRikaaaIntersectionObserver', {
                value: rikaaaIntersectionObserver
            });
        }
        this.intersectionobserver = window.IntersectionObserver || window.WcRikaaaIntersectionObserver;

        this.loadMainImageOnece = onebang(this.loadMainImage.bind(this));

        this.zoomIn_click = new StaticClick(this.clickOfZoomIn.bind(this));
        this.zoomOut_click = new StaticClick(this.clickOfZoomOut.bind(this));

        const edgeGideVisibrityWhenDrag = new Ease('ease-in');
        this.drag = new Drag((targetElement,mousePositionWhenDragStart,amountOfMouseMove)=> {
            this.dragTile(amountOfMouseMove);
            this.isApplyOffsetInDrawLoop = false;
        }).setDragStartFunc(() => {
            this.zoomOut_click.removeEvent(this.canvas);
            this.offsetOfSelectedTileWhenDragStart = this.offsetOfSelectedTile;
            edgeGideVisibrityWhenDrag.Stop();
            this.applyEndGideVisibrity(1);
        }).setDragEndFunc(() => {
            this.tileShift(this.indexOfSelectedTile, this.duration, () => {
                this.isApplyOffsetInDrawLoop = true;
            });
            edgeGideVisibrityWhenDrag.Stop();
            edgeGideVisibrityWhenDrag.duration = this.duration;
            edgeGideVisibrityWhenDrag.Start(e => {
                this.applyEndGideVisibrity(1 - e);
            }).End(() => {
                this.zoomOut_click.addEvent(this.canvas);
            });
        });

        this.hover = new Hover((e, ishover) => {
            if (!ishover) this.tileHoverEnd();
        }).setMouseMoveFunc(this.tileHovering.bind(this));
        
        if (this.zoomAble || this.isZoomedStart === false) this.zoomIn_click.addEvent(this.canvas);
        if (this.hoverAble) this.hover.addEvent(this.canvas);
        
    }
    connectedCallback() {
        this.init();

        if (!this.elementInViewPort) {
            this.prepareIntersection(null, null);
        }
        
        this.dispatchEvent(new CustomEvent('load'));
    }
    disconnectedCallback() {
        this.elementInViewPort.unobserve(this);
        this.elementInViewPort.disconnect(this);

        this.zoomIn_click.removeEvent(this.canvas);
        this.zoomOut_click.removeEvent(this.canvas);
        this.drag.removeEvent(this.canvas);
        this.hover.removeEvent(this.canvas);

        cancelAnimationFrame(this.animation);
    }
    static get observedAttributes() {
        return [
            'src',
            'row',
            'imagesize',
            'imagelength',
            'duration',
            'zoomable',
            'dragable',
            'hoverable',
            'iszoomedstart',
            'firstselect',
            'loadtiming',
            'backgroundcolor',
            'opacityofselected',
            'endgideable',
            'endgidewidth',
            'endgidebarcolor',
        ];
    }
    attributeChangedCallback(attr, oldval, newval) {
        if (attr === 'src' && newval !== '') {
            this.srcArrayOfImage = newval.split(',');
            if (this.isTryLoadMainData && this.isLoadedMainData === false) this.loadMainImage();
        };

        if (attr === 'row') {
            this.row = Math.max(Number(newval),1);
            if (this.loadedImageData !== null) {
                this.tilesState = this.computeTilesState(this.loadedImageData, this.row, this.getBoundingClientRect().width);
            };
        };

        if (attr === 'imagesize') {
            const size = newval.split('x');
            this.useImageSize = {
                w: size[0],
                h: size[1],
            }
        }

        if (attr === 'imagelength') this.useImageLength = Number(newval);

        if (attr === 'duration') this.duration = Number(newval);

        if (attr === 'firstselect') this.indexOfSelectedTile = Number(newval);

        if (attr === 'zoomable') {
            this.zoomAble = (newval.toLowerCase() === 'true');
            if (this.zoomAble) {
                if (this.zoomRatio <= 0.5) this.zoomIn_click.addEvent(this.canvas);
                else this.zoomOut_click.addEvent(this.canvas);
            } else {
                this.zoomIn_click.removeEvent(this.canvas);
                this.zoomOut_click.removeEvent(this.canvas);
            }
        }

        if (attr === 'dragable') {
            this.dragAble = (newval.toLowerCase() === 'true');
            if (this.dragAble === false) {
                this.drag.removeEvent(this.canvas);
                this.tileShift(this.indexOfSelectedTile, this.duration, () => {
                    this.isApplyOffsetInDrawLoop = true;
                });
            } else {
                if (this.zoomRatio === 1) this.drag.addEvent(this.canvas);
            }
        }

        if (attr === 'hoverable') {
            this.hoverAble = (newval.toLowerCase() === 'true')
            if (this.hoverAble) {
                if (this.zoomRatio === 0) this.hover.addEvent(this.canvas);
            } else {
                this.hover.removeEvent(this.canvas);
            }
        };
        

        if (attr === 'iszoomedstart') {
            this.isZoomedStart = (newval.toLowerCase() === 'true');
            if (this.isZoomedStart) {
                this.zoomIn_click.removeEvent(this.canvas);
                this.zoomOut_click.addEvent(this.canvas);
                this.drag.addEvent(this.canvas);
            }
        }

        if (attr === 'loadtiming') this.loadTiming = newval;

        if (attr === 'backgroundcolor') this.tileBackGroundColor = newval;

        if (attr === 'opacityofselected') this.opacityOfSelected = Number(newval);

        if (attr === 'endgideable') this.uiAble = (newval.toLowerCase() === 'true');

        if (attr === 'endgidewidth') this.endGideBarWidth = Number(newval);

        if (attr === 'endgidebarcolor') this.endGideBarColor = newval;
    }
    init() {
       this.loadImage().then(loadedImageData => {
           this.loadedImageData = loadedImageData;
           this.tilesState = this.computeTilesState(loadedImageData, this.row, this.getBoundingClientRect().width);
           this.offsetOfSelectedTile = this.calculatOffsetOfSelectedTile(this.indexOfSelectedTile, this.tilesState);

           this.applyRatioToEndGideBar(this.offsetOfSelectedTile.x, this.offsetOfSelectedTile.y);

           this.drawLoop(this.canvas, this.ctx);

           if (this.isZoomedStart) this.zoomIntoSelectedTile(this.indexOfSelectedTile, 0);
       });
    }
    prepareIntersection(root, rootMargin) {
        const option = {};

        if (root) option.root = root;
        option.rootMargin = this.loadTiming || rootMargin;

        this.elementInViewPort = new this.intersectionobserver(this.whenInViewPort.bind(this), option);
        this.elementInViewPort.observe(this);
    }
    setRoot(node) {
        if (!this.isTryLoadMainData) this.prepareIntersection(node, this.loadTiming);
    }
    whenInViewPort(event) {
        if (event[0].isIntersecting) {
            this.loadMainImageOnece();
            this.isTryLoadMainData = true;
        };
    }
    loadMainImage() {
        const isSrcExist = (this.srcArrayOfImage.length === 0) ? false : true;

        if (isSrcExist === false || this.isLoadedMainData === true) return false;

        this.loadImage(this.srcArrayOfImage).then(loadedImageData => {
            this.loadedImageData = loadedImageData;
            this.tilesState = this.computeTilesState(loadedImageData, this.row, this.getBoundingClientRect().width);
        
            this.isLoadedMainData = true;
        
            this.dispatchEvent(new CustomEvent('tileLoad'));
        });
    }
    calculatTileWidthHeight(oneOfLoadImageData,rowLength,widthOfTileArea) {
        return {
            width: widthOfTileArea / rowLength,
            height: (widthOfTileArea / rowLength) / oneOfLoadImageData.aspect.w * oneOfLoadImageData.aspect.h,
        }
    }
    computeTabelOfTile(loadedImageData_addedTileSize,rowLength) {
        const tileLength = loadedImageData_addedTileSize.length;
        const templateOfTable = new Array(Math.ceil(tileLength / rowLength)).fill(new Array(rowLength).fill(null));

        return templateOfTable.map((col, colIndex) => {
            return col.map((row, rowIndex) => {
                const imageData = loadedImageData_addedTileSize[(rowIndex + (rowLength * colIndex))];
                if (imageData) {
                    imageData.x = imageData.viewWdith * (rowIndex);
                    imageData.y = imageData.viewHeigth * colIndex;
                }
                return (imageData) ? imageData : null;
            });
        });
    }
    calculatTileAreaHeight(TableOfTile) {
        return TableOfTile.map(row => row[0].viewHeigth).reduce((a, c) => a + c);
    }
    computeTilesState(loadedImageData, rowLength, widthOfTileArea) {
        // add view size of tiles to loadedImageData
        const loadedImageData_addedTileSize = loadedImageData.map(imageData => {
            const viewSize = this.calculatTileWidthHeight(imageData, rowLength, widthOfTileArea);

            imageData.viewWdith  = viewSize.width;
            imageData.viewHeigth = viewSize.height;

            return imageData;
        });

        const table = this.computeTabelOfTile(loadedImageData_addedTileSize, rowLength);

        const tableFlat = table.reduce((a, c) => a.concat(c), []).filter(v => v !== null);
        
        const TileAreaHeight = this.calculatTileAreaHeight(table);

        return {
            table:table,
            tableFlat: tableFlat,
            tileAreaHeight: TileAreaHeight,
        }
    }
    calculatOffsetOfSelectedTile(selectedTileIndex, tilesState) {
        const selectedTileState = tilesState.tableFlat[selectedTileIndex];
        const offset = {
            x: ((selectedTileState.x + selectedTileState.viewWdith / 2) - this.getBoundingClientRect().width / 2) * -1,
            y: ((selectedTileState.y + selectedTileState.viewHeigth / 2) - tilesState.tileAreaHeight / 2) * -1,
        }
        return offset;
    }
    updateTileState(areaW) {
        this.tilesState = this.computeTilesState(this.loadedImageData, this.row, areaW);
    }
    drawLoop(canvasElem, ctx) {
        this.watchOffset = valueObserver(this.offsetOfSelectedTile.x + this.offsetOfSelectedTile.y, this.offsetChangeReporter);
        this.watchindexOfSelected = valueObserver(this.indexOfSelectedTile, this.indexOfSelectedChangeReporter);
        this.watchViewSize = valueObserver(this.getBoundingClientRect().width, this.updateTileState);

        this.loop = () => {
            const areaW = this.getBoundingClientRect().width;
            this.watchViewSize(areaW,{ watch: areaW});

            this.edgeOfMoveOffset = this.computeEdgeOfOffset(this.tilesState);

            const aspectOfSelectedTile = this.tilesState.tableFlat[this.indexOfSelectedTile].aspect;
            const screenWidth = areaW;
            const screenHeightWhenZoomOut = this.tilesState.tileAreaHeight;
            const screenHeightWhenZoomIn = screenWidth / aspectOfSelectedTile.w * aspectOfSelectedTile.h;
            const screenHeightDiff = screenHeightWhenZoomIn - screenHeightWhenZoomOut;

            const maxScreenHeight = Math.max(screenHeightWhenZoomIn, screenHeightWhenZoomOut);
            const minScreenHeight = Math.min(screenHeightWhenZoomIn, screenHeightWhenZoomOut);
            
            const screenHeight = Math.max(screenHeightWhenZoomOut * (1 - this.zoomRatio), screenHeightWhenZoomIn * this.zoomRatio);
            const screenHeight_Clicped = constrain(screenHeight, minScreenHeight, maxScreenHeight);

            this.screenWidth = screenWidth;
            this.screenHeight = screenHeightWhenZoomOut;

            let offset = this.offsetOfSelectedTile;
            if ((this.zoomRatio === 0 || this.zoomRatio === 1) && this.isApplyOffsetInDrawLoop) {
                offset = this.calculatOffsetOfSelectedTile(this.indexOfSelectedTile, this.tilesState);
                this.offsetOfSelectedTile = offset;
                
            }
            const offsetX = constrain(offset.x,this.edgeOfMoveOffset.minX,this.edgeOfMoveOffset.maxX) * this.zoomRatio;
            const offsetY = constrain(offset.y, this.edgeOfMoveOffset.minY, this.edgeOfMoveOffset.maxY) * this.zoomRatio;

            const scale = map(this.zoomRatio, 0, 1, 1, this.row);

            canvasElem.width = this.screenWidth * this.resolution;
            canvasElem.height = screenHeight_Clicped * this.resolution;
            canvasElem.style.width = `${this.screenWidth}px`;
            canvasElem.style.height = `${screenHeight_Clicped}px`;

            this.watchOffset(offsetX, offsetY, { watch: offset.x + offset.y });
            this.watchindexOfSelected(this.indexOfSelectedTile, { watch: this.indexOfSelectedTile });

            ctx.translate(this.screenWidth / 2 * this.resolution, this.screenHeight / 2 * this.resolution);
            ctx.scale(scale, scale); // zoom
            ctx.save();
            ctx.translate(offsetX * this.resolution, offsetY * this.resolution); // tile shift 
            ctx.save();
            ctx.translate(0, screenHeightDiff / 2 / this.row * this.zoomRatio * this.resolution); // fit tile top to canvas top
            ctx.save();
            ctx.translate(-1 * this.screenWidth / 2 * this.resolution, -1 * this.screenHeight / 2 * this.resolution); // centering 
            ctx.scale(this.resolution, this.resolution);

            this.tilesState.tableFlat.forEach(tile => {
                ctx.fillStyle = (this.isLoadedMainData) ? this.tileBackGroundColor : 'rgba(0,0,0,0)';
                ctx.fillRect(tile.x, tile.y, tile.viewWdith - 0.5, tile.viewHeigth - 0.5);

                if(this.hoverAble) ctx.globalAlpha = map(this.zoomRatio,0,1,tile.opacity,1);
                ctx.drawImage(tile.img, tile.x, tile.y, tile.viewWdith, tile.viewHeigth);
            });

            ctx.restore();
            ctx.restore();
            ctx.restore();

            this.animation = requestAnimationFrame(this.loop);
        }
        this.loop();
    }
    clickOfZoomIn(e) {
        this.clickPosition.x = e.offsetX;
        this.clickPosition.y = e.offsetY;
        const selected = this.calculatSelectedIndexFromClickPos(this.clickPosition.x, this.clickPosition.y, this.tilesState);

        this.dispatchEvent(new CustomEvent('tileClick', {
            detail: {
                zoomin: true,
                currentIndex: selected,
            }
        }));

        if (selected !== false) {
            this.zoomIn_click.removeEvent(this.canvas);
            // this.hover.removeEvent(this.canvas);
            this.zoomIntoSelectedTile(selected, this.duration, () => {
                this.zoomOut_click.addEvent(this.canvas);
                if (this.dragAble) this.drag.addEvent(this.canvas);
            });
        }
    }
    clickOfZoomOut() {
        this.zoomOut_click.removeEvent(this.canvas);

        this.dispatchEvent(new CustomEvent('tileClick', {
            detail: {
                zoomin: false,
                currentIndex:this.indexOfSelectedTile,
            }
        }));

        this.zoomOut(this.duration, () => {
            this.zoomIn_click.addEvent(this.canvas);
            // if(this.hoverAble) this.hover.addEvent(this.canvas);
            this.drag.removeEvent(this.canvas);
        });
    }
    calculatSelectedIndexFromClickPos(clickPositionX, clickPositionY, tileState) {
        const tableFlat = tileState.tableFlat;
        const tileOfDetected = tableFlat.filter((imageData, i) => {
            const detectionArea = {
                minX: imageData.x,
                maxX: imageData.x + imageData.viewWdith,
                minY: imageData.y,
                maxY: imageData.y + imageData.viewHeigth,
            }
            const isHorizon  = ((clickPositionX >= detectionArea.minX) && (clickPositionX < detectionArea.maxX));
            const isVertical = ((clickPositionY >= detectionArea.minY) && (clickPositionY < detectionArea.maxY));
            return (isHorizon && isVertical) ? true : false;
        });
        const indexOfSelectedTile = tableFlat.indexOf(tileOfDetected[0]);
        if (indexOfSelectedTile !== -1) {
            return indexOfSelectedTile;
        } else {
            return false;
        }
    }
    tileShift(indexOfSelectedTile, duration, shiftCompleteFunction) {
        this.indexOfSelectedTile = indexOfSelectedTile;
        const isCompleteFunction = (typeof shiftCompleteFunction === 'function') ? true : false;

        const currentOffset = this.offsetOfSelectedTile;
        const newOffset = this.calculatOffsetOfSelectedTile(indexOfSelectedTile, this.tilesState);
        const offsetDiff = {
            x: newOffset.x - currentOffset.x,
            y: newOffset.y - currentOffset.y,
        }

        const tileShiftEase = new Ease(this.easeTypeOfTileShift, duration);
        const easeFunction = e => {
            const calculatedOffset = {
                x: currentOffset.x + offsetDiff.x * e,
                y: currentOffset.y + offsetDiff.y * e,
            }
            this.offsetOfSelectedTile = calculatedOffset;
        };

        this.isApplyOffsetInDrawLoop = false;
        if (duration !== 0) {
            tileShiftEase.Start(e => {
                easeFunction(e);
            }).End(() => {
                if (isCompleteFunction) shiftCompleteFunction();
                this.indexOfSelectedTile = indexOfSelectedTile;
                this.isApplyOffsetInDrawLoop = true;
            });
        } else {
            easeFunction(1);
            if (isCompleteFunction) shiftCompleteFunction();
            this.indexOfSelectedTile = indexOfSelectedTile;
            this.isApplyOffsetInDrawLoop = true;
        }
    }
    zoom(desireRatio, duration, easeType, zoomCompleteFunction) {
        const currentZoomRatio = this.zoomRatio;
        const diff = desireRatio - currentZoomRatio;
        const sign = diff / Math.abs(diff);
        const direction = (sign === 1) ? true : false; // true/false = zoomin/zoomout

        this.zoomEase.Stop();
        this.zoomEase.duration = duration;
        this.zoomEase.type = easeType;

        const completeFunctionAble = (typeof zoomCompleteFunction === 'function') ? true : false;

        const easingFunction = e => {
            this.zoomRatio = currentZoomRatio + diff * e;
            this.dispatchEvent(new CustomEvent('zoom', {
                detail: {
                    zoomin: direction,
                    zoomRatio: this.zoomRatio,
                }
            }));
        };

        if (duration !== 0) {
            this.zoomEase.Start(e => {
                easingFunction(e);
            }).End(() => {
                if (completeFunctionAble) zoomCompleteFunction();
            });
        } else {
            easingFunction(1);
            if (completeFunctionAble) zoomCompleteFunction();
        }

    }
    zoomIntoSelectedTile(indexOfSelectedTile, duration, zoomCompleteFunction) {
        const desireRatio = 1;
        this.tileShift(indexOfSelectedTile, duration);
        this.zoom(desireRatio, duration, this.easeTypeOfZoomIn, zoomCompleteFunction);
    }
    zoomOut(duration, zoomCompleteFunction) {
        const desireRatio = 0;
        this.zoom(desireRatio, duration, this.easeTypeOfZoomOut, zoomCompleteFunction);
    }
    computeEdgeOfOffset(tilesState) {
        const tableFlat = tilesState.tableFlat;

        const tileOfXIsMin = tableFlat.reduce((a, c) => (a.x <= c.x) ? c : a);
        const tileOfYIsMin = tableFlat.reduce((a, c) => (a.y <= c.y) ? c : a);
        const tileOfXIsMin_index = tableFlat.indexOf(tileOfXIsMin);
        const tileOfYIsMin_index = tableFlat.indexOf(tileOfYIsMin);

        const tileOfMaxEdge_offset = this.calculatOffsetOfSelectedTile(0, tilesState);
        const tileOfXIsMin_offset = this.calculatOffsetOfSelectedTile(tileOfXIsMin_index, tilesState);
        const tileOfYIsMin_offset = this.calculatOffsetOfSelectedTile(tileOfYIsMin_index, tilesState);
        
        return {
            minX: tileOfXIsMin_offset.x,
            maxX: tileOfMaxEdge_offset.x,
            minY: tileOfYIsMin_offset.y,
            maxY: tileOfMaxEdge_offset.y,
        }
    }
    findTileFromOffset(offsetX,offsetY) {
        const tileLength = this.tilesState.tableFlat.length;
        const arrayOfOffsets = [...Array(tileLength).keys()].map(index => this.calculatOffsetOfSelectedTile(index, this.tilesState));

        const mostNearItemInOffsets = arrayOfOffsets.reduce((a, c) => {
            const checkX = (Math.abs(c.x - offsetX) < Math.abs(a.x - offsetX));
            const checkY = (Math.abs(c.y - offsetY) < Math.abs(a.y - offsetY));
            return (checkX || checkY) ? c : a;
        });    

        const mostNearTileIndex = arrayOfOffsets.indexOf(mostNearItemInOffsets);

        return mostNearTileIndex;
    }
    dragTile(amountOfMove) {
        const movedOffset = {
            x: this.offsetOfSelectedTileWhenDragStart.x + (amountOfMove.x / this.row),
            y: this.offsetOfSelectedTileWhenDragStart.y + (amountOfMove.y / this.row),
        }

        this.indexOfSelectedTile = this.findTileFromOffset(movedOffset.x, movedOffset.y);
        
        this.offsetOfSelectedTile = movedOffset;
    }
    tileHovering(event, amount, currentpagepos) {
        const indexOfselected = this.calculatSelectedIndexFromClickPos(currentpagepos.x, currentpagepos.y, this.tilesState);
        const prevSelectedData = this.tilesDataFilter('opacity', this.opacityOfSelected)[0];
        const indexOfPrevSelectedData = this.tilesState.tableFlat.indexOf(prevSelectedData);

        if (indexOfselected !== false) {
            this.canvas.style.cursor = 'pointer';

            this.tilesState.tableFlat[indexOfselected].opacity = this.opacityOfSelected;
        } else {
            this.canvas.style.cursor = '';
        }

        if (typeof prevSelectedData !== 'undefined' && indexOfselected !== indexOfPrevSelectedData) prevSelectedData.opacity = 1; 
    }
    tileHoverEnd() {
        const prevSelectedData = this.tilesDataFilter('opacity', this.opacityOfSelected)[0];
        if (typeof prevSelectedData !== 'undefined') prevSelectedData.opacity = 1;

        this.canvas.style.cursor = '';
    }
    tilesDataFilter(key,value) {
        return this.tilesState.tableFlat.filter(tile => tile[key] === value);
    }
    computeAspect(w,h) {
        return [w, h].reduce((a, c, i, array) => {
            let result = {};
            const gcd = (w, h) => {
                if (!h) return w;
                else return gcd(h, w % h);
            }
            if (i === 0) result.w = c / gcd(array[1], array[0]);
            if (i === 1) result.h = c / gcd(array[1], array[0]);
            return Object.assign(a, result);
        }, {});
    }
    calculatOffsetByPixelToRatio(offsetXByPixel, offsetYByPixel) {
        const edgeAmoutnOfTileMove = this.computeEdgeOfOffset(this.tilesState);

        const offsetXRatioFromLeft = map(offsetXByPixel, edgeAmoutnOfTileMove.minX, edgeAmoutnOfTileMove.maxX, 1, 0);
        const offsetYRatioFromTop = map(offsetYByPixel, edgeAmoutnOfTileMove.minY, edgeAmoutnOfTileMove.maxY, 1, 0);

        return {
            x: offsetXRatioFromLeft,
            y: offsetYRatioFromTop,
        }
    }
    set uiAble(boolean) {
        this.canvasOverlay.style.display = (boolean) ? '' : 'none';
    }
    set endGideBarWidth(px) {
        this.gidebarOfTop.parentNode.parentNode.style.height = `${px}px`;
        this.gidebarOfBottom.parentNode.parentNode.style.height = `${px}px`;
        this.gidebarOfRight.parentNode.parentNode.style.width = `${px}px`;
        this.gidebarOfLeft.parentNode.parentNode.style.width = `${px}px`;
    }
    set endGideBarColor(cssColorStr) {
        this.gidebarOfTop.style.backgroundColor = cssColorStr;
        this.gidebarOfBottom.style.backgroundColor = cssColorStr;
        this.gidebarOfRight.style.backgroundColor = cssColorStr;
        this.gidebarOfLeft.style.backgroundColor = cssColorStr;
    }
    applyEndGideVisibrity(desireVisibrityRatio) {
        // ratio 0 is hide. ratio 1 is show;
        const style = this.gideUi.style;
        style.opacity = desireVisibrityRatio;
        (desireVisibrityRatio > 0) ? style.display = 'block': style.display = 'none';
    }
    applyRatioToEndGideBar(offsetX,offsetY) {
        const offsetRatio = this.calculatOffsetByPixelToRatio(offsetX, offsetY);

        const barTopWidth = (1 - offsetRatio.y) * 100;
        const barBottomWidth = offsetRatio.y * 100;
        const barRightHeight = offsetRatio.x * 100;
        const barLeftHeight = (1 - offsetRatio.x) * 100;

        this.gidebarOfTop.style.width = `${barTopWidth}%`;
        this.gidebarOfBottom.style.width = `${barBottomWidth}%`;
        this.gidebarOfRight.style.height = `${barRightHeight}%`;
        this.gidebarOfLeft.style.height = `${barLeftHeight}%`;
        
    }
    offsetChangeReporter(offsetX, offsetY) {
        this.applyRatioToEndGideBar(offsetX, offsetY);

        const offsetRatio = this.calculatOffsetByPixelToRatio(offsetX, offsetY);

        this.dispatchEvent(new CustomEvent('offsetChange', {
            detail: {
                offsetXFromCenter: offsetX,
                offsetYFromCenter: offsetY,
                offsetXRatioFromLeft: offsetRatio.x,
                offsetYRatioFromTop: offsetRatio.y,
            }
        }));
    }
    indexOfSelectedChangeReporter(currentIndex) {
        this.dispatchEvent(new CustomEvent('selectedChange', {
            detail: {
                currentIndex: currentIndex,
            }
        }));
    }
    loadImage(srcArray) {
        const isLoadPlaceholder = (typeof srcArray === 'undefined') ? true : false;
        
        const PromiseOfLoadImage = [...Array(this.useImageLength).keys()].map(index => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.addEventListener('load', () => {
                    resolve(img);
                });
                img.src = (isLoadPlaceholder) ? placeholder : srcArray[index];
            });
        });
        return Promise.all(PromiseOfLoadImage).then(images => {
            return images.reduce((a, c) => {
                return a.concat({
                    img: c,
                    width: this.useImageSize.w,
                    height: this.useImageSize.h,
                    aspect: this.computeAspect(this.useImageSize.w, this.useImageSize.h),
                    opacity: 1,
                });
            },[]);
        });
    }
}


