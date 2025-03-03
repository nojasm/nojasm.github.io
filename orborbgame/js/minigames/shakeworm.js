import { MiniGame } from "../MiniGame.js";
export class ShakeWormMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.lastMousePos = null;
        this.traveledDistance = 0;
        this.neededDistance = 25000;
    }
    start() {
        super.start();
        this.lastMousePos = null;
        this.traveledDistance = 0;
        this.neededDistance = 25000 + 50000 * this.difficultyFactor;
    }
    drawBackground() {
        // Background
        this.ctx.fillStyle = "#7f9";
        this.ctx.fillRect(0, 0, this.w, this.h);
        // Positions are with a 1920x1080 monitor, they will be scaled accordingly
        let worms = [
            { x1: 50, y1: 70, x2: 122, y2: 104 },
            { x1: 350, y1: 500, x2: 310, y2: 579 },
            { x1: 620, y1: 300, x2: 602, y2: 233 },
            { x1: 700, y1: 100, x2: 770, y2: 66 },
            { x1: 890, y1: 700, x2: 960, y2: 728 },
            { x1: 1290, y1: 200, x2: 1160, y2: 165 },
            { x1: 1410, y1: 800, x2: 1360, y2: 730 },
            { x1: 1540, y1: 550, x2: 1620, y2: 590 },
            { x1: 1710, y1: 420, x2: 1805, y2: 460 },
            { x1: 1800, y1: 1060, x2: 1735, y2: 1000 },
        ];
        // Fix worms positions
        worms.forEach((w, i) => {
            Object.keys(w).forEach((wk) => {
                if (wk.includes("x"))
                    worms[i][wk] = worms[i][wk] / 1920 * this.w;
                else if (wk.includes("y"))
                    worms[i][wk] = worms[i][wk] / 1080 * this.h;
            });
        });
        // Background worms
        this.ctx.strokeStyle = "#f08d3277";
        worms.forEach((worm, i) => {
            this.ctx.beginPath();
            this.ctx.lineWidth = 3 + 3 * (i % 5);
            let r1 = i % 2 == 0;
            let r2 = i % 3 == 1;
            let r3 = r1 != r2 && i >= (worms.length / 2);
            worm.cpx1 = 9 + Math.abs(Math.sin((this.secondsSinceStart / (r3 ? 0.7 : 1.2)) + (r1 ? 0.2 : -0.2)) * 12);
            worm.cpy1 = 3 + Math.abs(Math.cos((this.secondsSinceStart / (r1 ? 0.95 : 1.2)) - (r3 ? 0.6 : 0.15)) * (r2 ? 10 : 12));
            worm.cpx2 = -(10 + Math.abs(Math.sin((this.secondsSinceStart / (r2 ? 0.72 : 1.2)) + (r1 ? 0.1 : 0.35)) * (r1 ? 5 : 8)));
            worm.cpy2 = -(5 + Math.abs(Math.cos((this.secondsSinceStart / (r1 ? 0.5 : 0.85)) - (r2 ? 0.3 : 0.42069)) * (r3 ? 17 : 7)));
            this.ctx.moveTo(worm.x1, worm.y1);
            this.ctx.bezierCurveTo(worm.x1 + worm.cpx1, worm.y1 + worm.cpy1, worm.x2 + worm.cpx2, worm.y2 + worm.cpy2, worm.x2, worm.y2);
            this.ctx.stroke();
        });
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        if (this.traveledDistance >= this.neededDistance) {
            this.setFinish();
            return;
        }
        this.drawBackground();
        // Rotate phone
        let rot = -0.5 + ((this.lastMousePos === null ? (this.w / 2) : this.lastMousePos[0]) / this.w) * (2 * 0.5);
        this.ctx.save();
        this.ctx.translate(this.w / 2, (this.h / 2 + 500));
        this.ctx.rotate(rot);
        this.ctx.translate(-this.w / 2, -(this.h / 2 + 500));
        // Arm
        this.ctx.fillStyle = "#fea";
        this.ctx.fillRect(this.w / 2 - (120 / 2), 400, 120, 700);
        // Phone
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(this.w / 2 - (200 / 2), 200, 200, 300);
        // Phone screen
        this.ctx.fillStyle = "#eee";
        this.ctx.fillRect(this.w / 2 - (200 / 2) + 20, 200 + 30, 200 - (2 * 20), 300 - (2 * 30));
        // Phone home button
        this.ctx.fillStyle = "#666";
        this.ctx.beginPath();
        this.ctx.arc(this.w / 2, 485, 11, 0, 2 * Math.PI);
        this.ctx.fill();
        // Worm on screen
        this.ctx.strokeStyle = "orange";
        this.ctx.lineWidth = 15;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.w / 2 - 15, 200 + 50);
        //this.ctx.lineTo(this.w / 2 + 15, 200 + 120);
        //this.ctx.lineTo(this.w / 2 - 15, 200 + 180);
        //this.ctx.lineTo(this.w / 2 + 15, 200 + 250);
        this.ctx.bezierCurveTo(this.w / 2 + 15, 200 + 80, this.w / 2 - 35, 200 + 180, this.w / 2 + 15, 200 + 250);
        this.ctx.stroke();
        // Fingers
        this.ctx.fillStyle = "#fea";
        this.ctx.fillRect(this.w / 2 - 115, 230, 30, 50);
        this.ctx.fillRect(this.w / 2 - 115, 320, 30, 50);
        this.ctx.fillRect(this.w / 2 - 115, 410, 30, 50);
        this.ctx.restore();
        // Text
        this.ctx.font = "70px Impact";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText("SHAKE THE WORMOID", this.w / 2 + Math.sin(this.secondsSinceStart * 3) * 80, 150);
        this.ctx.fillStyle = "#000";
        this.ctx.fillText("SHAKE THE WORMOID", this.w / 2 + Math.sin(this.secondsSinceStart * 3) * 80, 155);
        // Bar background
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(200, this.h - 200, this.w - 2 * 200, 50);
        // Traveling bar
        this.ctx.fillStyle = "#0ec";
        let rel = this.traveledDistance / this.neededDistance;
        this.ctx.fillRect(205, this.h - 200 + 5, rel * (this.w - 2 * 205), 50 - 2 * 5);
    }
    event(ev) {
        if (ev.type == "mousemove") {
            this.traveledDistance += Math.abs(ev.movementX);
            this.lastMousePos = [ev.x, ev.y];
        }
    }
}
