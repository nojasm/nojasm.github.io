var _a, _b, _c, _d, _e, _f;
import { GameManager } from "./GameManager.js";
import { Track } from "./Music.js";
import { Orb } from "./Orb.js";
import { Player } from "./Player.js";
var game;
var studioIsOpen = false;
var curtainsOpenSound = new Audio("res/sounds/curtains-open.mp3");
var curtainsCloseSound = new Audio("res/sounds/curtains-close.mp3");
var uiClickSound = new Audio("res/sounds/ui-click.mp3");
var failSound = new Audio("res/sounds/fail.mp3");
curtainsOpenSound.volume = 0.2;
curtainsCloseSound.volume = 0.2;
uiClickSound.volume = 0.1;
failSound.volume = 0.3;
function playUIClickSound() {
    uiClickSound.cloneNode(true).play();
}
function resizeCanvas() {
    if (game && game.canvas) {
        game.canvas.width = game.canvas.clientWidth;
        game.canvas.height = game.canvas.clientHeight;
    }
}
window.onresize = () => {
    resizeCanvas();
};
function playFailSound() {
    failSound.play();
}
function getRandomOf(list) {
    return list[Math.floor(Math.random() * list.length)];
}
function showFailScreen(score) {
    let failEl = document.getElementById("fail");
    document.getElementById("fail__score").innerText = "SCORE: " + Math.floor(score);
    failEl.style.display = "flex";
    let comment;
    if (score === 0) {
        comment = getRandomOf(["bruh", "What happened?", "You did not understand the game.", ":("]);
    }
    else if (score < 200) {
        comment = getRandomOf(["What happened?", "My grandma is better", "GET OUT", "*laughs*"]);
    }
    else if (score < 1500) {
        comment = getRandomOf(["Could be better.", "This is all you have?", "Don't freak out", "Worse than me", "We all start somewhere"]);
    }
    else if (score < 5000) {
        comment = getRandomOf(["Could be better.", "Not bad.", "You're getting better!", "wow!"]);
    }
    else {
        comment = getRandomOf(["lmao your cheat's broke", "You are either a god, or a cheater. Cheater.", "reported.", "/ban you"]);
    }
    document.getElementById("fail__comment").innerText = comment;
    playFailSound();
    setTimeout(() => {
        failEl.style.opacity = "1.0";
    }, 500);
    setTimeout(() => {
        closeCurtains(() => {
            failEl.style.display = "none";
            failEl.style.opacity = "0.0";
            backToMenu();
            openCurtains();
        });
    }, 3000);
}
function closeCurtains(afterClosedCallback) {
    curtainsCloseSound.play();
    document.getElementById("curtains").style.top = "0";
    setTimeout(() => {
        afterClosedCallback();
    }, 1000);
}
function openCurtains() {
    curtainsOpenSound.play();
    document.getElementById("curtains").style.top = "-100%";
}
var lastGameUpdateTime = null;
function gameLoop() {
    if (game.running && !game.failedGame) {
        if (lastGameUpdateTime === null)
            lastGameUpdateTime = Date.now();
        requestAnimationFrame(gameLoop);
        var now = Date.now();
        game.handleEvents();
        game.update((now - lastGameUpdateTime) / 1000);
        lastGameUpdateTime = now;
    }
    else if (game.failedGame) {
        lastGameUpdateTime = null;
        showFailScreen(game.score);
    }
}
function backToMenu() {
    document.getElementById("game").style.display = "none";
}
function openStudio() {
    studioIsOpen = true;
    game.music.switchTo(Track.STUDIO);
    document.getElementById("studio").style.display = "flex";
}
function studioBackToMenu() {
    studioIsOpen = false;
    game.music.switchTo(Track.MENU);
    document.getElementById("studio").style.display = "none";
}
// Setup all elements in the UI and prepare Game Manager
function setup() {
    var _a;
    game = new GameManager();
    game.player = new Player();
    game.player.name = "orbian";
    game.player.orb = new Orb();
    // PLAY button
    (_a = document.getElementById("front-card__play")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
        playUIClickSound();
        closeCurtains(() => {
            game.canvas = document.getElementById("game__canvas");
            game.ctx = game.canvas.getContext("2d");
            document.getElementById("game").style.display = "initial";
            resizeCanvas();
            // No event listeners, because they may be set multiple times
            game.canvas.onclick = (event) => { game.event(event); };
            game.canvas.onmousemove = (event) => { game.event(event); };
            game.canvas.onmousedown = (event) => { game.event(event); };
            game.canvas.onmouseup = (event) => { game.event(event); };
            game.start();
            openCurtains();
            gameLoop();
        });
    });
}
let orbCanvasBig = document.getElementById("orb-canvas");
let orbCanvasGame = document.getElementById("game__orb");
let orbCanvasStudio = document.getElementById("studio-orb");
// Renders both the large main-menu loop as well as the smaller one during the game (bottom left corner)
function orbRenderingLoop() {
    var _a, _b, _c, _d, _e, _f;
    requestAnimationFrame(orbRenderingLoop);
    (_b = (_a = game.player) === null || _a === void 0 ? void 0 : _a.orb) === null || _b === void 0 ? void 0 : _b.renderToCanvas(orbCanvasBig.getContext("2d"));
    (_d = (_c = game.player) === null || _c === void 0 ? void 0 : _c.orb) === null || _d === void 0 ? void 0 : _d.renderToCanvas(orbCanvasGame.getContext("2d"));
    (_f = (_e = game.player) === null || _e === void 0 ? void 0 : _e.orb) === null || _f === void 0 ? void 0 : _f.renderToCanvas(orbCanvasStudio.getContext("2d"));
}
window.onmousemove = (ev) => {
    if (game) {
        game.lastMousePos = [ev.x, ev.y];
    }
};
(_a = document.getElementById("front-card__orb-edit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
    playUIClickSound();
    closeCurtains(() => {
        openStudio();
        openCurtains();
    });
});
function getNextEntry(list, entry, previous = false) {
    let newIndex = (list.indexOf(entry) + (previous ? -1 : +1)) % list.length;
    if (newIndex < 0)
        newIndex = list.length - (Math.abs(newIndex) % list.length);
    return list[newIndex];
}
function changeValueFromStudio(key, value) {
    var _a, _b;
    if (key === "color") {
        game.player.orb.color = getNextEntry(game.player.orb.colors, game.player.orb.color, value === -1);
    }
    else if (key === "mouth") {
        game.player.orb.currentMouth = getNextEntry((_a = game.player.orb) === null || _a === void 0 ? void 0 : _a.mouths, game.player.orb.currentMouth, value === -1);
    }
    else if (key === "eyes") {
        game.player.orb.currentEyes = getNextEntry((_b = game.player.orb) === null || _b === void 0 ? void 0 : _b.eyes, game.player.orb.currentEyes, value === -1);
    }
    game.player.orb.updateLocalStorage();
}
[...document.getElementsByClassName("studio-option")].forEach((studioOption) => {
    studioOption.getElementsByClassName("studio-option-left")[0].addEventListener("click", (event) => {
        playUIClickSound();
        changeValueFromStudio(studioOption.getAttribute("studio-option"), -1);
    });
    studioOption.getElementsByClassName("studio-option-right")[0].addEventListener("click", (event) => {
        playUIClickSound();
        changeValueFromStudio(studioOption.getAttribute("studio-option"), +1);
    });
});
(_b = document.getElementById("studio-close")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => {
    playUIClickSound();
    closeCurtains(() => {
        studioBackToMenu();
        openCurtains();
    });
});
(_c = document.getElementById("studio-orb-flip")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (event) => {
    var _a;
    playUIClickSound();
    game.player.orb.flipped = !((_a = game.player.orb) === null || _a === void 0 ? void 0 : _a.flipped);
    game.player.orb.updateLocalStorage();
});
(_d = document.getElementById("studio-orb-randomize")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (event) => {
    var _a;
    playUIClickSound();
    (_a = game.player.orb) === null || _a === void 0 ? void 0 : _a.randomize();
    game.player.orb.updateLocalStorage();
});
(_e = document.getElementById("studio-orb-reset")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", (event) => {
    playUIClickSound();
    localStorage.removeItem("orb");
    game.player.orb = new Orb();
    game.player.orb.updateLocalStorage();
});
(_f = document.getElementById("studio-orb-download")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", (event) => {
    var _a, _b;
    playUIClickSound();
    let canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    let ctx = canvas.getContext("2d");
    (_b = (_a = game.player) === null || _a === void 0 ? void 0 : _a.orb) === null || _b === void 0 ? void 0 : _b.renderToCanvas(ctx, true);
    const link = document.createElement("a");
    link.download = "orb.png";
    link.href = canvas.toDataURL();
    link.click();
});
let transformElements = {
    "studio-transform-up": "",
    "studio-transform-down": "",
    "studio-transform-left": "",
    "studio-transform-right": "",
    "studio-transform-scale-up": "",
    "studio-transform-scale-down": "",
    "studio-transform-rotate-left": "",
    "studio-transform-rotate-right": "",
};
Object.keys(transformElements).forEach((e) => {
    [...document.getElementsByClassName(e)].forEach((e) => {
        e.onmousedown = (event) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let parent = (_b = (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.getAttribute("studio-option");
            let transform = null;
            if (parent == "mouth") {
                transform = (_d = (_c = game.player) === null || _c === void 0 ? void 0 : _c.orb) === null || _d === void 0 ? void 0 : _d.mouthTransform;
            }
            else if (parent == "eyes") {
                transform = (_f = (_e = game.player) === null || _e === void 0 ? void 0 : _e.orb) === null || _f === void 0 ? void 0 : _f.eyesTransform;
            }
            let btn = event.target.classList[0];
            if (btn == "studio-transform-up") {
                transform.y -= 10;
            }
            else if (btn == "studio-transform-down") {
                transform.y += 10;
            }
            else if (btn == "studio-transform-left") {
                transform.x -= 10;
            }
            else if (btn == "studio-transform-right") {
                transform.x += 10;
            }
            else if (btn == "studio-transform-scale-up") {
                transform.scale += 0.05;
            }
            else if (btn == "studio-transform-scale-down") {
                transform.scale -= 0.05;
            }
            else if (btn == "studio-transform-rotate-left") {
                transform.rotation -= 5;
            }
            else if (btn == "studio-transform-rotate-right") {
                transform.rotation += 5;
            }
            (_h = (_g = game.player) === null || _g === void 0 ? void 0 : _g.orb) === null || _h === void 0 ? void 0 : _h.updateLocalStorage();
        };
    });
});
/*
game!.player!.orb!.flipped = !game!.player!.orb?.flipped;
    game.player!.orb!.updateLocalStorage();
*/
window.onkeydown = (ev) => {
    if (ev.key === "Escape") {
        if (studioIsOpen) {
            closeCurtains(() => {
                studioBackToMenu();
                openCurtains();
            });
        }
    }
};
setup();
orbRenderingLoop();
