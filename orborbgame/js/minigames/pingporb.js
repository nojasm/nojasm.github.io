import { MiniGame } from "../MiniGame.js";
export class PingPorbMiniGame extends MiniGame {
    constructor() {
        super(...arguments);
        this.lastMousePos = null;
        this.hasClicked = false;
        this.userBarHeight = 0;
        this.userBarMaxSpeed = 50;
        this.cpuBarHeight = 0;
        this.ballX = 0;
        this.ballY = 0;
        this.ballVX = 0;
        this.ballVY = 0;
        this.speed = 25;
        this.norbImg = null;
    }
    start() {
        super.start();
        this.setPlayerWinsWhenTimeEnds();
        this.ballX = this.w / 2;
        this.ballY = this.h / 2;
        this.ballVX = (Math.random() > 0.5 ? 1 : -1) * 50;
        this.ballVY = (Math.random() - 0.5) * 15;
        this.norbImg = document.createElement("img");
        this.norbImg.src = "res/norb.png";
    }
    update(deltaTime) {
        if (!this.ctx)
            return;
        const ballSize = 50;
        const barH = 150;
        const barW = 30;
        // Background
        this.ctx.fillStyle = "#223";
        this.ctx.fillRect(0, 0, this.w, this.h);
        // User bar
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(100, this.userBarHeight - (barH / 2), barW, barH);
        // CPU bar
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.w - 100 - barW, this.cpuBarHeight - (barH / 2), barW, barH);
        // Move cpu bar
        this.cpuBarHeight = this.ballY;
        // Draw ball
        this.ctx.drawImage(this.norbImg, this.ballX - ballSize, this.ballY - ballSize, ballSize * 2, ballSize * 2);
        let ballPlayerBarDist = Math.abs(this.userBarHeight - this.ballY);
        let ballCPUBarDist = Math.abs(this.cpuBarHeight - this.ballY);
        // Move ball
        this.ballX += this.ballVX * deltaTime * this.speed;
        this.ballY += this.ballVY * deltaTime * this.speed;
        const maxDeflection = 0.5 + 0.5 * this.difficultyFactor;
        // Vertical bounce
        if (this.ballY < 200) {
            this.ballVY *= -1;
            this.ballY = 200;
        }
        else if (this.ballY > (this.h - 200)) {
            this.ballVY *= -1;
            this.ballY = this.h - 200;
        }
        if (this.ballX < (150 + ballSize / 2)) {
            // If player bar is close enough, reflect, otherwise fail
            if (ballPlayerBarDist < (150 / 2)) {
                this.ballVX *= -1;
                this.ballX = 150 + ballSize / 2;
                // Deflect vertically too
                let deflectionFactor = ballPlayerBarDist / (barH / 2);
                deflectionFactor = 1 + maxDeflection * deflectionFactor;
                this.ballVY *= deflectionFactor;
                this.speed += 2;
            }
            else {
                this.setFail();
            }
        }
        else if (this.ballX > (this.w - (150 + ballSize / 2))) {
            // If cpu bar is close enough, reflect, otherwise win
            if (ballCPUBarDist < (150 / 2)) {
                this.ballVX *= -1;
                this.ballX = this.w - (150 + ballSize / 2);
                this.speed += 2;
            }
            else {
                this.setFinish();
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
            this.userBarHeight = this.lastMousePos[1];
            if (this.userBarHeight < 200)
                this.userBarHeight = 200;
            else if (this.userBarHeight > (this.h - 200))
                this.userBarHeight = this.h - 200;
        }
    }
}
