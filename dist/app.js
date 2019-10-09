(function () {
    'use strict';

    var ready = (function (fn) {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        setTimeout(function () {
          fn();
        }, 0);
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    });

    /*jshint esversion: 8 */
    ready(function () {
      var load_Ev = document.getElementsByTagName("rikaaa-image-tile")[0];
      load_Ev.addEventListener('load', function () {
        //  load_Ev.setRoot(document.querySelector('.maindemo'));
        console.log("load");
      });
      var tile_loadedEv = document.getElementsByTagName("rikaaa-image-tile")[0];
      tile_loadedEv.addEventListener("tileLoad", function () {
        console.log("tile loaded");
      });
      var tile_zoomEv = document.getElementsByTagName("rikaaa-image-tile")[0];
      tile_zoomEv.addEventListener("zoom", function (event) {
        var zoomIs = event.detail.zoomin ? "in" : "out";
        console.log("zoom " + zoomIs);
        console.log("zoom ratio : " + event.detail.zoomRatio);
      });
      var tile_offsetChangeEv = document.getElementsByTagName("rikaaa-image-tile")[0];
      tile_offsetChangeEv.addEventListener("offsetChange", function (event) {
        console.log("offsetX from center by pixel : " + event.detail.offsetXFromCenter);
        console.log("offsetY from center by pixel : " + event.detail.offsetYFromCenter);
        console.log("offsetX ratio from left : " + event.detail.offsetXRatioFromLeft);
        console.log("offsetY ratio from top : " + event.detail.offsetYRatioFromTop);
      });
      var tile_selectedChangeEv = document.getElementsByTagName("rikaaa-image-tile")[0];
      tile_selectedChangeEv.addEventListener("selectedChange", function (event) {
        console.log("current selected index of tile : " + event.detail.currentIndex);
      });
      var tile_tileClickEv = document.getElementsByTagName("rikaaa-image-tile")[0];
      tile_tileClickEv.addEventListener("tileClick", function (evnet) {
        var zoomIs = event.detail.zoomin ? "in" : "ou";
        console.log("this click is \"zoom " + zoomIs + "\"");
        console.log("current selected index of tile : " + event.detail.currentIndex);
      }); // scroll to tile top when click

      var currentScrollY = 0;
      var marginTop = 16;
      var tile_demo = document.getElementsByTagName("rikaaa-image-tile")[0];
      tile_demo.addEventListener('tileClick', function (event) {
        if (event.detail.zoomin) currentScrollY = window.pageYOffset;
      });
      tile_demo.addEventListener("zoom", function (event) {
        if (event.detail.zoomin === false) return false;
        var desireScrollTop = tile_demo.offsetTop - marginTop;
        var diffFromDisire = desireScrollTop - currentScrollY;
        var newScrollY = currentScrollY + diffFromDisire * event.detail.zoomRatio;
        window.scrollTo(0, newScrollY);
      });
    });

}());
