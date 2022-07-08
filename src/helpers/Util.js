import MidiTable from '../resources/midinotes.json';


export function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export function breakUpBarsBeatsSixteens(time) {
    if (time != null) {

        const splittedTime = time.split(":");

        return { bars: splittedTime[0], beats: splittedTime[1], sixteens: parseFloat(splittedTime[2]).toFixed(2) };
    }

    return { bars: 0, beats: 0, sixteens: 0.00 };
}

export function translateBarBeatsSixteens2Ticks(time) {
    if (time != null) {

        const splittedTime = time.split(":");
        return +(splittedTime[0] * 16) + +(splittedTime[1] * 4) + +parseFloat(splittedTime[2]).toFixed(0);

    }
    return 0;
}

export function getNoteNameFromMidiNote(midi) {
    
    return MidiTable[midi];
}

export function inverseCanvasYAxis(origVal, viewportHeight, scale) {
    return viewportHeight - (origVal * scale);
}


