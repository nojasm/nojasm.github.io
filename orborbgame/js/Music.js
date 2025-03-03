export var Track;
(function (Track) {
    Track[Track["MENU"] = 0] = "MENU";
    Track[Track["STUDIO"] = 1] = "STUDIO";
    Track[Track["DEFAULT"] = 2] = "DEFAULT";
    Track[Track["FAIL"] = 3] = "FAIL";
    Track[Track["SORTING"] = 4] = "SORTING";
    Track[Track["FINDNORB"] = 5] = "FINDNORB";
    Track[Track["KILLEM"] = 6] = "KILLEM";
    Track[Track["ORBULATE"] = 7] = "ORBULATE";
})(Track || (Track = {}));
;
export class Music {
    loadAudioBufferFromUrl(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((res) => {
                res.arrayBuffer().then((ab) => {
                    this.audio.decodeAudioData(ab).then((buffer) => {
                        resolve(buffer);
                    });
                });
            });
        });
    }
    constructor() {
        this.currentAudioBufferSource = null;
        this.tracks = {};
        this.audio = new AudioContext();
        this.currentTrack = Track.MENU;
        this.nextTrack = null;
        // Load all tracks AudioBuffers
        Promise.all([
            this.loadAudioBufferFromUrl("res/music/menu.wav"),
            this.loadAudioBufferFromUrl("res/music/studio.wav"),
            this.loadAudioBufferFromUrl("res/music/default.wav"),
            this.loadAudioBufferFromUrl("res/music/fail.wav"),
            this.loadAudioBufferFromUrl("res/music/sorting.wav"),
            this.loadAudioBufferFromUrl("res/music/findnorb.wav"),
            this.loadAudioBufferFromUrl("res/music/killem.wav"),
            this.loadAudioBufferFromUrl("res/music/orbulate.wav")
        ]).then((buffers) => {
            buffers.forEach((buffer, index) => {
                this.tracks[[Track.MENU, Track.STUDIO, Track.DEFAULT, Track.FAIL, Track.SORTING, Track.FINDNORB, Track.KILLEM, Track.ORBULATE][index]] = buffer;
            });
            // Play next buffer if current one ends
            this.playBuffer(this.tracks[this.currentTrack]);
        });
    }
    playBuffer(buffer) {
        let bs = this.audio.createBufferSource();
        bs.buffer = buffer;
        bs.connect(this.audio.destination);
        bs.start();
        bs.onended = () => {
            if (this.currentTrack == Track.FAIL)
                this.nextTrack = Track.MENU;
            if (this.nextTrack === null)
                this.nextTrack = this.currentTrack;
            this.currentTrack = this.nextTrack;
            this.playBuffer(this.tracks[this.currentTrack]);
            this.nextTrack = null;
        };
    }
    switchTo(track) {
        this.nextTrack = track;
    }
}
