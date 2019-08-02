/*jshint esversion: 8 */
import ready from './assets/js/_Domready';

ready(() => {

     let load_Ev = document.getElementsByTagName("rikaaa-image-tile")[0];
     load_Ev.addEventListener('load', () => {
         // tile_domload.setRoot(document.querySelector('.maindemo'));
         console.log("load");
     });

    let tile_loadedEv = document.getElementsByTagName("rikaaa-image-tile")[0];
    tile_loadedEv.addEventListener("tileLoad", function () {
        console.log("tile loaded");
    });

    let tile_zoomEv = document.getElementsByTagName("rikaaa-image-tile")[0];
    tile_zoomEv.addEventListener("zoom", function (event) {
        let zoomIs = (event.detail.zoomin) ? "in" : "out";
        console.log("zoom " + zoomIs);
        console.log("zoom ratio : " + event.detail.zoomRatio);
    });

    let tile_offsetChangeEv = document.getElementsByTagName("rikaaa-image-tile")[0];
    tile_offsetChangeEv.addEventListener("offsetChange", function (event) {
        console.log("offsetX from center by pixel : " + event.detail.offsetXFromCenter);
        console.log("offsetY from center by pixel : " + event.detail.offsetYFromCenter);
        console.log("offsetX ratio from left : " + event.detail.offsetXRatioFromLeft);
        console.log("offsetY ratio from top : " + event.detail.offsetYRatioFromTop);
    });

    let tile_selectedChangeEv = document.getElementsByTagName("rikaaa-image-tile")[0];
    tile_selectedChangeEv.addEventListener("selectedChange", function (event) {
        console.log("current selected index of tile : " + event.detail.currentIndex); 
    });

    let tile_tileClickEv = document.getElementsByTagName("rikaaa-image-tile")[0];
    tile_tileClickEv.addEventListener("tileClick", function (evnet) {
        let zoomIs = (event.detail.zoomin) ? "in" : "ou";
        console.log("this click is \"zoom " + zoomIs + "\"");
        console.log("current selected index of tile : " + event.detail.currentIndex);
    });

    // scroll to tile top when click
    let currentScrollY = 0;
    let marginTop = 16;
    let tile_demo = document.getElementsByTagName("rikaaa-image-tile")[0];
    tile_demo.addEventListener('tileClick', function (event) {
        if (event.detail.zoomin) currentScrollY = window.pageYOffset;
    });
    tile_demo.addEventListener("zoom", function (event) {
        if (event.detail.zoomin === false) return false;
        let desireScrollTop = tile_demo.offsetTop - marginTop;
        let diffFromDisire = desireScrollTop - currentScrollY;
        let newScrollY = currentScrollY + diffFromDisire * event.detail.zoomRatio;
        window.scrollTo(0, newScrollY);
    });
});