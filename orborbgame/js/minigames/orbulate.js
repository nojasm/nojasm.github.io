import { MiniGame } from "../MiniGame.js";
export class OrbulateMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.lastMousePos = null;
        this.hasClicked = false;
        this.progress = 0.2;
        this.secondsSinceLastClick = 1;
        this.titleRotFromAngle = 0;
    }
    start() {
        this.lastMousePos = null;
        this.hasClicked = false;
        this.progress = 0.2;
        this.secondsSinceLastClick = 1.0;
        this.titleRotFromAngle = 0.0;
        super.start();
    }
    interpolatePoints(points, x) {
        if (x <= 0.0)
            return points[0][1];
        if (x >= 1.0)
            return points[points.length - 1][1];
        // Find the lowest index where the point is still < x
        let lowerIndex = 0;
        let count = 0;
        for (var p of points) {
            if (p[0] >= x)
                break;
            lowerIndex = count++;
        }
        // rel = 0 means that x is on the left point, rel = 1 on the right, rel = 0.5 is in the center of both
        let rel = (x - points[lowerIndex][0]) / (points[lowerIndex + 1][0] - points[lowerIndex][0]);
        return points[lowerIndex][1] + rel * (points[lowerIndex + 1][1] - points[lowerIndex][1]);
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        this.secondsSinceLastClick += deltaTime;
        // Mod is an exponentially decreasing value that resets with each click and then goes down quickly
        let mod = 0.7 * Math.exp(-(3.0) * (this.secondsSinceLastClick - 0.5));
        if (this.progress >= 1.0) {
            super.setFinish();
        }
        else if (this.progress < 0.0) {
            super.setFail();
        }
        // Slowly reduce progress
        this.progress -= deltaTime / (13 - 5 * this.difficultyFactor);
        if (this.hasClicked) {
            this.progress += (0.07 - 0.03 * this.difficultyFactor);
        }
        // Background
        this.ctx.fillStyle = "#744";
        this.ctx.fillRect(0, 0, this.w, this.h);
        let orbulation = this.interpolatePoints([[0.0, 0.0], [0.2, 0.2], [0.4, 0.38], [0.6, 0.52], [0.75, 0.59], [0.8, 0.61], [0.85, 0.62], [0.9, 0.69], [1.0, 1.0]], this.progress) * 55;
        // Draw Orbs border
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.w / 2 - orbulation, this.h / 2, 55, 0, 2 * Math.PI);
        this.ctx.arc(this.w / 2 + orbulation, this.h / 2, 55, 0, 2 * Math.PI);
        this.ctx.fill();
        // Draw orbs orbulating
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.arc(this.w / 2 - orbulation, this.h / 2, 50, 0, 2 * Math.PI);
        this.ctx.arc(this.w / 2 + orbulation, this.h / 2, 50, 0, 2 * Math.PI);
        this.ctx.fill();
        // Title that moves with each click
        let titleSize = (mod * 0.5) + 1;
        let titleRot = this.titleRotFromAngle * mod;
        this.ctx.save();
        this.ctx.translate(this.w / 2, 300);
        this.ctx.rotate(titleRot);
        this.ctx.scale(titleSize, titleSize);
        this.ctx.fillStyle = "red";
        this.ctx.font = "50px Arial Black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("ORBULATE", 0, 0);
        this.ctx.restore();
        this.hasClicked = false;
    }
    event(ev) {
        if (ev.type == "click") {
            this.hasClicked = true;
            this.titleRotFromAngle = Math.random() * 0.2 - 0.1;
            this.secondsSinceLastClick = 0;
        }
        else if (ev.type == "mousemove") {
            this.lastMousePos = [ev.x, ev.y];
        }
    }
}
