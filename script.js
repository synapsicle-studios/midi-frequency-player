import { keys } from "./keys.js";

const octaves = 2;
let octavePitch = 4;
let currentKeyBeta = "C";
let type = "square";
const player = true;

const audioContext = new AudioContext();
const activeNotes = {};

const NOTES = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11
};

const currentKey = () => keys[currentKeyBeta];

function normalizeNote(note) {
    const map = {
        "B♯": "C",
        "E♯": "F",
        "C♭": "B",
        "F♭": "E",

        "C♯♯": "D",
        "D♯♯": "E",
        "E♯♯": "F#",
        "F♯♯": "G",
        "G♯♯": "A",
        "A♯♯": "B",

        "C♯": "C#",
        "D♯": "D#",
        "F♯": "F#",
        "G♯": "G#",
        "A♯": "A#",

        "D♭": "Db",
        "E♭": "Eb",
        "G♭": "Gb",
        "A♭": "Ab",
        "B♭": "Bb"
    };

    return map[note] || note;
}

function noteToFrequency(note, octave) {
    note = normalizeNote(note);

    const midi = NOTES[note] + (octave + 1) * 12;

    return 440 * Math.pow(2, (midi - 69) / 12);
}

function playKey(keyNum) {
    if (!player) return;
    if (activeNotes[keyNum]) return;

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const note = currentKey().notes[keyNum % 7];
    const octave = Math.floor(keyNum / 7) + octavePitch;

    const frequency = noteToFrequency(note, octave);

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.value = frequency;

    gain.gain.setValueAtTime(0.1, audioContext.currentTime);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();

    activeNotes[keyNum] = {
        osc,
        gain
    };
}

function stopKey(keyNum) {
    const note = activeNotes[keyNum];

    if (!note) return;

    note.gain.gain.cancelScheduledValues(audioContext.currentTime);
    note.gain.gain.setValueAtTime(
        note.gain.gain.value,
        audioContext.currentTime
    );

    note.gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.1
    );

    note.osc.stop(audioContext.currentTime + 0.1);

    delete activeNotes[keyNum];
}

function loadKeyboard() {
    const keyDiv = document.getElementById("keydiv");
    keyDiv.innerHTML = "";

    for (let i = 0; i <= octaves * 7; i++) {
        const key = document.createElement("div");

        key.id = `key-${i}`;
        key.classList.add("key");

        const note = currentKey().notes[i % 7];
        const octave = Math.floor(i / 7) + octavePitch;

        key.textContent = `${note}${octave}`;

        key.addEventListener("mousedown", () => {
            playKey(i);
        });

        key.addEventListener("mouseup", () => {
            stopKey(i);
        });

        key.addEventListener("mouseleave", () => {
            stopKey(i);
        });

        keyDiv.appendChild(key);
    }
}

document.addEventListener("mouseup", () => {
    Object.keys(activeNotes).forEach(keyNum => {
        stopKey(Number(keyNum));
    });
});

loadKeyboard();
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "1":
            type = "sine";
            console.log("Wave type: sine");
            break;

        case "2":
            type = "square";
            console.log("Wave type: square");
            break;

        case "3":
            type = "sawtooth";
            console.log("Wave type: sawtooth");
            break;

        case "4":
            type = "triangle";
            console.log("Wave type: triangle");
            break;
    }
});