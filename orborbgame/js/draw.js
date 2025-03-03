"use strict";
let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
let isDrawing = false;
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
});
canvas.addEventListener("mouseup", (event) => {
    isDrawing = false;
});
canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        let px = event.x - event.target.getBoundingClientRect().x;
        let py = event.y - event.target.getBoundingClientRect().y;
    }
});
