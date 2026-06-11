import {keys} from "./keys.js";

const octaves = 1;
let octavePitch = 4;
let currentKeyBeta = "BF";

const currentKey = () => keys[currentKeyBeta];

function noteToFrequency(note, octave) {
    const midi = NOTES[note] + (octave + 1) * 12;
    return 440 * Math.pow(2, (midi - 69) / 12);
}

function playKey(keyNum) {

}

function loadKeyboard() {
    for (let i = 0; i < octaves * 8 + 1; i++) {
        const key = document.createElement('div');
        key.id = `key-${i}`;

        key.addEventListener("click", () => {
            playKey(i);
        });

        key.classList.add('key');
        key.innerHTML = `${currentKey().notes[i % 7]}${Math.floor(i / 8) + octavePitch}`;

        document.getElementById('keydiv').appendChild(key);
    }
}

loadKeyboard();