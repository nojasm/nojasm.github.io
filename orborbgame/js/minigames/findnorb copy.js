import { MiniGame } from "../MiniGame.js";
export class FindNorbMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.lastMousePos = null;
        this.hasClicked = false;
        this.size = 0;
        this.randomIndex = 0;
    }
    start() {
        super.start();
        this.size = Math.floor(Math.random() * 10 + 5);
        this.randomIndex = Math.floor(Math.random() * (this.size * this.size));
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        this.ctx.fillStyle = "#443";
        this.ctx.fillRect(0, 0, this.w, this.h);
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                let radius = 25;
                let xPos = 100 + x * 60;
                let yPos = 100 + y * 60;
                let thisIndexIsNorb = (y * this.size + x) == this.randomIndex;
                // Highlight if mouse is above
                if (this.lastMousePos) {
                    let d = Math.sqrt(Math.pow(this.lastMousePos[0] - xPos, 2) + Math.pow((this.lastMousePos[1] - yPos), 2));
                    if (d < radius) {
                        this.ctx.beginPath();
                        this.ctx.fillStyle = "#58f";
                        this.ctx.arc(xPos, yPos, radius + 4, 0, 2 * Math.PI);
                        this.ctx.fill();
                        if (this.hasClicked) {
                            if (thisIndexIsNorb)
                                this.setFinish();
                            else
                                this.setFail();
                        }
                    }
                }
                if (thisIndexIsNorb) {
                    // Put norb here!
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#dd3";
                    this.ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
                else {
                    // No norb...
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#db2";
                    this.ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
        this.hasClicked = false;
    }
    event(ev) {
        if (ev.type == "click") {
            this.hasClicked = true;
        }
        else if (ev.type == "mousemove") {
            this.lastMousePos = [ev.x, ev.y];
        }
    }
}
