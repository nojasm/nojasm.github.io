import { MiniGame } from "../MiniGame.js";
export class BuildPhoneMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.lastMousePos = null;
        this.isDragging = false;
        this.colors = ["#222", "#a33", "#4a4"];
        this.wantedColor = 2;
        this.selectedColor = 1;
        this.cameraPos = [0.1, 0.1];
        this.logoPos = [0.1, 0.1];
        this.phoneBodyAspect = 1.2;
    }
    start() {
        super.start();
        this.cameraPos = [0.1 * Math.random() * 0.8, 0.1 * Math.random() * 0.8];
        this.logoPos = [0.1 * Math.random() * 0.8, 0.1 * Math.random() * 0.8];
    }
    // Calculates how much the phone is done building yet
    calculateProgress() {
        let aspectScore = Math.abs(2 - this.phoneBodyAspect) * 2;
        // TODO: This function
        return aspectScore;
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        if (this.calculateProgress() > 0.8) {
            super.setFinish();
        }
        // Background
        this.ctx.fillStyle = "#ddd";
        this.ctx.fillRect(0, 0, this.w, this.h);
        // Aspect ratio slider
        let sliderValue = (this.phoneBodyAspect - 0.5) / 2;
        this.ctx.fillStyle = "#444";
        this.ctx.fillRect(this.w - 100 - 10, this.h / 2 - (400 / 2), 20, 400);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(this.w - 100 - 25, this.h / 2 - (100 / 2) + (-200 + 400 * sliderValue), 50, 100);
        // Phone body
        this.ctx.beginPath();
        let w = 400;
        let h = w * this.phoneBodyAspect;
        this.ctx.roundRect(this.w / 2 - (w / 2), this.h / 2 - (h / 2), w, h, 15);
        this.ctx.fillStyle = this.colors[this.selectedColor];
        this.ctx.fill();
        // Camera
        this.ctx.beginPath();
        this.ctx.roundRect(300, 300, 100, 100, 15);
        this.ctx.fillStyle = "#0002";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(330, 330, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#fffc";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(370, 335, 15, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#fffa";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(350, 380, 15, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#fff8";
        this.ctx.fill();
        // Logo
    }
    event(ev) {
        if (ev.type == "mousedown") {
            this.isDragging = true;
        }
        else if (ev.type == "mouseup") {
            this.isDragging = false;
        }
        else if (ev.type == "mousemove") {
            let me = ev;
            this.lastMousePos = [me.x, me.y];
            if (this.isDragging) {
                let sx = (me.x - (this.w - 100 - 25)) / 50;
                let sy = (me.y - (this.h / 2 - 200)) / 400;
                if (sx > 0 && sx < 1 && sy > 0 && sy < 1) {
                    this.phoneBodyAspect = 0.5 + 2 * sy;
                }
            }
        }
    }
}
