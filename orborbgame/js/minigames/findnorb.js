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
        this.size = Math.floor((this.difficultyFactor * 20) + 5);
        this.randomIndex = Math.floor(Math.random() * (this.size * this.size));
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        this.ctx.fillStyle = "#443";
        this.ctx.fillRect(0, 0, this.w, this.h);
        let radius = 25 - 15 * this.difficultyFactor;
        let padding = 25 - 20 * this.difficultyFactor;
        let totalSize = this.size * (2 * radius) + ((this.size - 1) * padding);
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                let xPos = (this.w / 2 - totalSize / 2) + x * (radius * 2 + padding);
                let yPos = (this.h / 2 - totalSize / 2) + y * (radius * 2 + padding);
                yPos += 50;
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
                    this.ctx.fillStyle = "hsl(50deg, 100%, 55%)";
                    this.ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
                else {
                    // No norb...
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "hsl(50deg, " + (85 + this.difficultyFactor * 10) + "%, " + (80 - this.difficultyFactor * 20) + "%)";
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
