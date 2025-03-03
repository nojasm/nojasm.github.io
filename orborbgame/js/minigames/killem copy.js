import { MiniGame } from "../MiniGame.js";
export class KillEmMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.norbs = []; // List of norbs in format (x, y, r)
        this.lastMousePos = null;
        this.hasClicked = false;
    }
    start() {
        super.start();
        for (var i = 0; i < 5; i++) {
            let norb = [Math.random() * 0.8 + 0.1, Math.random() * 0.8 + 0.1, Math.random() * 30 + 30];
            this.norbs.push(norb);
        }
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        // If all norbs are null, the game is done
        let allNull = this.norbs.every((x) => x === null);
        if (allNull) {
            super.setFinish();
        }
        this.ctx.fillStyle = "#223";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.norbs.forEach((norb, i) => {
            if (norb === null)
                return;
            let x = norb[0] * this.w;
            let y = norb[1] * this.h;
            let r = norb[2];
            if (this.lastMousePos) {
                let d = Math.sqrt(Math.pow(this.lastMousePos[0] - x, 2) + Math.pow((this.lastMousePos[1] - y), 2));
                if (d < r) {
                    // Mouse is over circle, so highlight it
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#ea0";
                    this.ctx.arc(x, y, r + 4, 0, 2 * Math.PI);
                    this.ctx.fill();
                    if (this.hasClicked) {
                        this.norbs[i] = null;
                        this.hasClicked = false;
                    }
                }
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = "#cc2";
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fill();
        });
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
