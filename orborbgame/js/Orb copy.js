export class Orb {
    constructor() {
        this.mouths = ["drooling", "hmm", "kiss", "normal", "o", "opened small", "opened", "sad", "scared", "small", "smiling", "smoking", "straight", "talking"];
        this.eyes = ["angry", "low", "narrow", "normal", "sad", "thinking", "wide"];
        this.hue = 50;
        this.mouth = "huge";
        this.eyes = "huge";
    }
    renderToCanvas(ctx, eyeAngle) {
        ctx.clearRect(0, 0, 1000, 1000);
        // Darker border
        ctx.beginPath();
        ctx.arc(500, 500, 400, 0, 2 * Math.PI);
        ctx.fillStyle = "hsl(" + this.hue + "deg, 90%, 40%)";
        ctx.fill();
        // Body
        ctx.beginPath();
        ctx.arc(500, 500, 370, 0, 2 * Math.PI);
        ctx.fillStyle = "hsl(" + this.hue + "deg, 100%, 55%)";
        ctx.fill();
        // Mouth
        if (this.mouth == "normal") {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(350, 700);
            ctx.bezierCurveTo(350, 750, 650, 750, 650, 700);
            ctx.stroke();
        }
        else if (this.mouth == "straight") {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(400, 700);
            ctx.lineTo(600, 700);
            ctx.stroke();
        }
        else if (this.mouth == "hmm") {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(400, 700);
            ctx.bezierCurveTo(400, 750, 600, 650, 600, 700);
            ctx.stroke();
        }
        else if (this.mouth == "huge") {
            ctx.fillStyle = "black";
            ctx.lineWidth = 80;
            ctx.beginPath();
            ctx.moveTo(200, 650);
            ctx.bezierCurveTo(300, 900, 700, 900, 800, 650);
            ctx.fill();
        }
        else if (this.mouth == "joker") {
            ctx.strokeStyle = "#f33";
            ctx.lineWidth = 40;
            ctx.beginPath();
            ctx.moveTo(250, 650);
            ctx.lineTo(300, 750);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(750, 650);
            ctx.lineTo(700, 750);
            ctx.stroke();
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(300, 750);
            ctx.bezierCurveTo(350, 850, 650, 850, 700, 750);
            ctx.stroke();
        }
        if (this.cosmetic !== "sunglasses") {
            // Eyes
            if (this.eyes == "normal") {
                // Eyeballs
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.arc(400, 450, 50, 0, 2 * Math.PI);
                ctx.arc(600, 450, 50, 0, 2 * Math.PI);
                ctx.fill();
                // Eyes
                ctx.beginPath();
                ctx.fillStyle = "black";
                let eyeX = Math.sin(eyeAngle) * 25;
                let eyeY = Math.cos(eyeAngle) * 25;
                ctx.arc(400 + eyeX, 450 + eyeY, 5, 0, 2 * Math.PI);
                ctx.arc(600 + eyeX, 450 + eyeY, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
            else if (this.eyes == "high") {
                // Eyeballs
                ctx.beginPath();
                ctx.fillStyle = "#f33";
                ctx.arc(400, 450, 50, 0, 2 * Math.PI);
                ctx.arc(600, 450, 50, 0, 2 * Math.PI);
                ctx.fill();
                // Eyes
                ctx.beginPath();
                ctx.fillStyle = "white";
                let eyeX = Math.sin(eyeAngle) * 25;
                let eyeY = Math.cos(eyeAngle) * 25;
                ctx.arc(400 + eyeX, 450 + eyeY, 30, 0, 2 * Math.PI);
                ctx.arc(600 + eyeX, 450 + eyeY, 30, 0, 2 * Math.PI);
                ctx.fill();
            }
            else if (this.eyes == "asian") {
                // Eyeballs
                ctx.beginPath();
                ctx.fillStyle = "#ffa";
                ctx.ellipse(400, 450, 70, 30, 0, 0, 2 * Math.PI);
                ctx.ellipse(600, 450, 70, 30, 0, 0, 2 * Math.PI);
                ctx.fill();
                // Eyes
                ctx.beginPath();
                ctx.fillStyle = "black";
                let eyeX = Math.sin(eyeAngle) * 15;
                let eyeY = Math.cos(eyeAngle) * 15;
                ctx.arc(400 + eyeX, 450 + eyeY, 30, 0, 2 * Math.PI);
                ctx.arc(600 + eyeX, 450 + eyeY, 30, 0, 2 * Math.PI);
                ctx.fill();
            }
            else if (this.eyes == "huge") {
                // Eyeballs
                ctx.beginPath();
                ctx.fillStyle = "#ffa";
                ctx.arc(330, 450, 170, 0, 2 * Math.PI);
                ctx.arc(670, 450, 170, 0, 2 * Math.PI);
                ctx.fill();
                // Eyes
                ctx.beginPath();
                ctx.fillStyle = "black";
                let eyeX = Math.sin(eyeAngle) * 150;
                let eyeY = Math.cos(eyeAngle) * 150;
                ctx.arc(330 + eyeX, 450 + eyeY, 30, 0, 2 * Math.PI);
                ctx.arc(670 + eyeX, 450 + eyeY, 30, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        if (this.cosmetic == "none") {
        }
        else if (this.cosmetic == "hat") {
            ctx.fillStyle = "black";
            ctx.save();
            ctx.translate(500, 400);
            ctx.rotate(0.15);
            ctx.translate(-500, -400);
            ctx.fillRect(350, 100, 400, 100);
            ctx.fillRect(450, 10, 200, 150);
            ctx.restore();
        }
        else if (this.cosmetic == "glasses") {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(350, 500, 80, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(500, 530, 100, -Math.PI + 0.65, -0.65);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(650, 500, 80, 0, 2 * Math.PI);
            ctx.stroke();
        }
        else if (this.cosmetic == "sunglasses") {
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.lineWidth = 50;
            ctx.beginPath();
            ctx.ellipse(350, 470, 150, 120, -0.3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(400, 450);
            ctx.lineTo(600, 450);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(650, 470, 150, 120, 0.3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 15;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(670, 385);
            ctx.quadraticCurveTo(720, 400, 750, 450);
            ctx.stroke();
        }
        else if (this.cosmetic == "beard") {
            ctx.fillStyle = "#320";
            ctx.beginPath();
            let yOffset = this.mouth == "huge" ? 30 : 0;
            ctx.moveTo(400, 650 - yOffset);
            ctx.lineTo(400, 700 - yOffset);
            ctx.lineTo(433, 680 - yOffset);
            ctx.lineTo(466, 700 - yOffset);
            ctx.lineTo(500, 680 - yOffset);
            ctx.lineTo(533, 700 - yOffset);
            ctx.lineTo(566, 680 - yOffset);
            ctx.lineTo(600, 700 - yOffset);
            ctx.lineTo(600, 650 - yOffset);
            ctx.fill();
        }
        else if (this.cosmetic == "eyebrows") {
            ctx.fillStyle = "#210";
            ctx.lineCap = "round";
            ctx.lineWidth = 40;
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.lineTo(400, 300);
            ctx.moveTo(750, 250);
            ctx.lineTo(600, 300);
            ctx.stroke();
        }
        // Drop shadow
        ctx.beginPath();
        ctx.fillStyle = "#1111";
        ctx.ellipse(500, 960, 320, 40, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}
