export class Transform {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scale = 1;
    }
}
export class Orb {
    constructor() {
        this.flipped = false;
        this.colors = ["white", "#2f8ae9", "#f71836", "#a1afc3", "#c131ff", "#ff8d13", "#00ef0b", "#fee305", "#85dae7", "#497928", "#f14aae"];
        this.mouths = ["", "drooling", "hmm", "kiss", "lips", "lips2", "normal", "o", "opened small", "opened", "rect", "sad", "sad2", "scared", "small", "smiling", "smoking", "straight", "talking"];
        this.eyes = ["", "angry", "high", "low", "narrow", "normal", "pirate", "sad", "thinking", "wide", "glasses", "cyclops", "anime"];
        this.mouthTransform = new Transform();
        this.eyesTransform = new Transform();
        this.mouthImages = {}; // {name: HTMLImageElement, ...}
        this.eyesImages = {}; // {name: HTMLImageElement, ...}
        if (localStorage.getItem("orb") && false) {
            let lsOrb = JSON.parse(localStorage.getItem("orb"));
            this.color = lsOrb.color;
            this.currentMouth = lsOrb.mouth;
            this.currentEyes = lsOrb.eyes;
            this.flipped = lsOrb.flipped;
            this.eyesTransform = lsOrb.eyesTransform || new Transform();
            this.mouthTransform = lsOrb.mouthTransform || new Transform();
        }
        else {
            this.color = this.colors[0];
            this.currentMouth = this.mouths[6];
            this.currentEyes = this.eyes[5];
            //this.flipped = false;
            this.eyesTransform = new Transform();
            this.mouthTransform = new Transform();
            this.updateLocalStorage();
        }
        this.mouths.forEach((m) => {
            if (m === "")
                return;
            this.mouthImages[m] = document.createElement("img");
            this.mouthImages[m].src = "res/orbs/mouths/" + m + ".png";
        });
        this.eyes.forEach((e) => {
            if (e === "")
                return;
            this.eyesImages[e] = document.createElement("img");
            this.eyesImages[e].src = "res/orbs/eyes/" + e + ".png";
        });
    }
    randomize() {
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.currentMouth = this.mouths[Math.floor(Math.random() * this.mouths.length)];
        this.currentEyes = this.eyes[Math.floor(Math.random() * this.eyes.length)];
    }
    updateLocalStorage() {
        localStorage.setItem("orb", JSON.stringify({
            color: this.color,
            mouth: this.currentMouth,
            eyes: this.currentEyes,
            eyesTransform: this.eyesTransform,
            mouthTransform: this.mouthTransform,
            flipped: this.flipped
        }));
    }
    renderToCanvas(ctx, asExport = false) {
        ctx.clearRect(0, 0, 1000, 1000);
        // Darker border
        ctx.beginPath();
        ctx.arc(500, 500, 400, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        // Body
        ctx.beginPath();
        ctx.arc(500, 500, 370, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        let eyeOffsetY = Math.sin(Date.now() / 500) * 8;
        let mouthOffsetY = Math.sin(Date.now() / 500 + 0.5) * 8;
        // Perhaps flip orb
        /*ctx.save();
        ctx.translate(500, 500);
        ctx.scale(this.flipped ? -1 : +1, 1);
        ctx.translate(-500, -500);*/
        // Draw eyes
        if (this.currentEyes !== "") {
            ctx.save();
            ctx.translate(500, 500);
            ctx.rotate((this.eyesTransform.rotation / 180) * Math.PI);
            ctx.scale(this.eyesTransform.scale, this.eyesTransform.scale);
            ctx.translate(-500, -500);
            ctx.drawImage(this.eyesImages[this.currentEyes], this.eyesTransform.x, this.eyesTransform.y + eyeOffsetY, 1000, 1000);
            ctx.restore();
        }
        // Draw mouth
        if (this.currentMouth !== "") {
            ctx.save();
            ctx.translate(500, 500);
            ctx.rotate((this.mouthTransform.rotation / 180) * Math.PI);
            ctx.scale(this.mouthTransform.scale, this.mouthTransform.scale);
            ctx.translate(-500, -500);
            ctx.drawImage(this.mouthImages[this.currentMouth], this.mouthTransform.x, this.mouthTransform.y + mouthOffsetY, 1000, 1000);
            ctx.restore();
        }
        if (!asExport) {
            // Drop shadow
            ctx.beginPath();
            ctx.fillStyle = "#1111";
            ctx.ellipse(500, 960, 320, 40, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
        else {
            // Watermark
            ctx.fillStyle = "#0005";
            ctx.font = "30px arial";
            ctx.fillText("orborbgame™", 50, 50);
        }
    }
}
