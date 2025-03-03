import { MiniGame } from "../MiniGame.js";
var OrbColor;
(function (OrbColor) {
    OrbColor[OrbColor["RED"] = 0] = "RED";
    OrbColor[OrbColor["BLUE"] = 1] = "BLUE";
})(OrbColor || (OrbColor = {}));
;
class Orb {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.color = Math.random() >= 0.5 ? OrbColor.RED : OrbColor.BLUE;
        this.posX = Math.random() * 0.8 + 0.1;
        this.posY = Math.random() * 0.8 + 0.1;
    }
}
export class SortOrbsMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.lastMousePos = null;
        this.currentlyDraggingOrbIndex = null;
        this.orbs = [];
    }
    start() {
        super.start();
        this.lastMousePos = null;
        this.currentlyDraggingOrbIndex = null;
        while (true) {
            this.orbs = [];
            let minOrbs = 3 + (this.difficultyFactor * 5);
            let maxAddOrbs = 3 + this.difficultyFactor * 6;
            for (var i = 0; i < Math.floor(minOrbs + Math.random() * maxAddOrbs); i++) {
                this.orbs.push(new Orb());
            }
            // If all in correct place already, randomize again
            if (!this.allInCorrectPlace())
                break;
        }
    }
    // Check if all blue orbs are left and red orbs are right
    allInCorrectPlace() {
        return this.orbs.every((e) => {
            return (e.color == OrbColor.BLUE && e.posX < 0.5) || (e.color == OrbColor.RED && e.posX > 0.5);
        });
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        if (this.allInCorrectPlace() && this.currentlyDraggingOrbIndex === null) {
            super.setFinish();
        }
        // Background
        this.ctx.fillStyle = "#223";
        this.ctx.fillRect(0, 0, this.w, this.h);
        // Blue zone (left)
        this.ctx.fillStyle = "#748ee9";
        this.ctx.fillRect(0, 0, this.w / 2, this.h);
        // Red zone (right)
        this.ctx.fillStyle = "#db6666";
        this.ctx.fillRect(this.w / 2, 0, this.w / 2, this.h);
        // "SORT" text
        this.ctx.fillStyle = "#111a";
        this.ctx.font = "100px Atma";
        this.ctx.textAlign = "center";
        this.ctx.fillText("sort orbs", this.w / 2, 250);
        // Draw orbs
        this.orbs.forEach((orb, index) => {
            // Draw picked up orb
            if (index === this.currentlyDraggingOrbIndex) {
                this.ctx.beginPath();
                this.ctx.fillStyle = orb.color == OrbColor.BLUE ? "hsl(250deg, 90%, 40%)" : "hsl(0deg, 90%, 40%)";
                this.ctx.arc(orb.posX * this.w, orb.posY * this.h, 55, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.fillStyle = orb.color == OrbColor.BLUE ? "hsl(250deg, 100%, 55%)" : "hsl(0deg, 100%, 55%)";
                this.ctx.arc(orb.posX * this.w, orb.posY * this.h, 50, 0, 2 * Math.PI);
                this.ctx.fill();
                // Draw normal orb
            }
            else {
                this.ctx.beginPath();
                this.ctx.fillStyle = orb.color == OrbColor.BLUE ? "hsl(250deg, 90%, 40%)" : "hsl(0deg, 90%, 40%)";
                this.ctx.arc(orb.posX * this.w, orb.posY * this.h, 45, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.beginPath();
                this.ctx.fillStyle = orb.color == OrbColor.BLUE ? "hsl(250deg, 100%, 55%)" : "hsl(0deg, 100%, 55%)";
                this.ctx.arc(orb.posX * this.w, orb.posY * this.h, 40, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        });
    }
    event(ev) {
        if (ev.type == "mousedown") {
            this.currentlyDraggingOrbIndex = null;
            // Check which orb should be dragged
            this.orbs.forEach((orb, index) => {
                if (this.currentlyDraggingOrbIndex !== null)
                    return;
                let x = orb.posX * this.w;
                let y = orb.posY * this.h;
                let mx = ev.x;
                let my = ev.y;
                let d = Math.sqrt(Math.pow(mx - x, 2) + Math.pow(my - y, 2));
                if (d < 50) {
                    this.currentlyDraggingOrbIndex = index;
                }
            });
        }
        else if (ev.type == "mouseup") {
            this.currentlyDraggingOrbIndex = null;
        }
        else if (ev.type == "mousemove") {
            this.lastMousePos = [ev.x, ev.y];
            if (this.currentlyDraggingOrbIndex !== null) {
                this.orbs[this.currentlyDraggingOrbIndex].posX += ev.movementX / this.w;
                this.orbs[this.currentlyDraggingOrbIndex].posY += ev.movementY / this.h;
                if (this.orbs[this.currentlyDraggingOrbIndex].posX < 0.1)
                    this.orbs[this.currentlyDraggingOrbIndex].posX = 0.1;
                else if (this.orbs[this.currentlyDraggingOrbIndex].posX > 0.9)
                    this.orbs[this.currentlyDraggingOrbIndex].posX = 0.9;
                if (this.orbs[this.currentlyDraggingOrbIndex].posY < 0.1)
                    this.orbs[this.currentlyDraggingOrbIndex].posY = 0.1;
                else if (this.orbs[this.currentlyDraggingOrbIndex].posY > 0.9)
                    this.orbs[this.currentlyDraggingOrbIndex].posY = 0.9;
            }
        }
    }
}
