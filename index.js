let audioCtx = new AudioContext();
let listener = audioCtx.listener;

let audioPlaying = false;

let posX = window.innerWidth / 2 + 600;
let posY = window.innerWidth / 2;
let posZ = -500;

listener.positionX.value = posX;
listener.positionY.value = posY;
listener.positionZ.value = posZ;

listener.forwardX.value = 0;
listener.forwardY.value = 0;
listener.forwardZ.value = -1;
listener.upX.value = 0;
listener.upY.value = 1;
listener.upZ.value = 0;

const panner = new PannerNode(audioCtx, {
    panningModel: "HRTF",
    distanceModel: "linear",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    orientationX: 0.0,
    orientationY: 0.0,
    orientationZ: -1.0,
    refDistance: 1,
    maxDistance: 20_000,
    rolloffFactor: 10,
    coneInnerAngle: 40,
    coneOuterAngle: 50,
    coneOuterGain: 0.4,
});

let audioElement = document.querySelector("audio");

const track = new MediaElementAudioSourceNode(audioCtx, {
    mediaElement: audioElement,
});

track
    .connect(panner)
    .connect(audioCtx.destination);

document.querySelector("#play-button").addEventListener("click", () => {
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    if (audioPlaying) {
        audioElement.pause();
        audioPlaying = false;
    } else {
        audioElement.play();
        audioPlaying = true;
    }
})

document.querySelector("#x").addEventListener("change", e => {
    let x = e.target.value;
    listener.positionX.value = window.innerWidth / 2 + parseInt(x);
})

document.querySelector("#y").addEventListener("change", e => {
    let y = e.target.value;
    listener.positionY.value = window.innerWidth / 2 + parseInt(y);
})

document.querySelector("#z").addEventListener("change", e => {
    let z = e.target.value;
    listener.positionZ.value = parseInt(z);
})