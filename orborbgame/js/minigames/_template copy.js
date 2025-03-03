import { MiniGame } from "../MiniGame.js";
export class TemplateMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.lastMousePos = null;
        this.hasClicked = false;
    }
    start() {
        super.start();
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        let someCriteria = ;
        if (someCriteria) {
            super.setFinish();
        }
        // Background
        this.ctx.fillStyle = "#223";
        this.ctx.fillRect(0, 0, this.w, this.h);
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
