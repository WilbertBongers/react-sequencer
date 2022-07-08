import React, { useContext, useCallback, useRef, useState, useEffect } from "react";
import * as Tone from "tone";
import useSong from '../hooks/useSong';
import { getNoteNameFromMidiNote } from '../helpers/Util';
import Enumerable from "linq";

const ToneContext = React.createContext();

const ToneProvider = ({ children }) => {

    const [isActivated, setIsActivated] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [prevState, setPrevState] = useState(true);
    const [bpm, setBpm] = useState(120);
    const [destination, setDestination] = useState(Tone.getDestination());;
    const [context, getContext] = useState(Tone.getContext());
    const [synth, setSynth] = useState([]);
    const [position, setPosition] = useState(null);
    const [volume, setVolume] = useState(parseFloat(-20));
    const [tick, setTick] = useState(Tone.TransportTime("16n"));
    const beat = useRef(0);
    const { song } = useSong();

    useEffect(() => {
        createSynthArray();
        return () => synth.forEach((synth) => synth.dispose());
    }, [])

    useEffect(() => {
        setTick(Tone.TransportTime("16n"));
    }, [bpm])

    const setNotes = useCallback(
        (time) => {

            beat.current = (beat.current + 1) % 64;

            song.tracks.map((track, index) => {
                const note = Enumerable.from(track.notes)
                    .where(n => n.step === beat.current)
                    .firstOrDefault(null);
                if (note) {
                    console.log(note);
                    synth[index].triggerAttackRelease(
                        getNoteNameFromMidiNote(note.note),
                        note.duration * tick
                    );
                }
            });
            setPosition(Tone.TransportTime(beat.current * tick).toBarsBeatsSixteenths());
        }
    )

    const createSynthArray = () => {
        const piano = new Tone.Sampler({
            urls: {
                A2: "A2.mp3",
                A3: "A3.mp3",
                A4: "A4.mp3",
                A5: "A5.mp3",
            },
            baseUrl: "https://tonejs.github.io/audio/salamanderander/"
        }).toDestination();

        const synth = new Tone.Synth({
            oscillator: { type: "square8" }
        }).toDestination();

        const bass = new Tone.Sampler({
            urls: {
                A1: "A1.mp3",
                A2: "A2.mp3",
            },
            baseUrl: "https://tonejs.github.io/audio/casio/"
        }).toDestination();

        const drums = new Tone.Sampler({
            urls: {
                E1: "kick.mp3",
                F1: "snare.mp3",
                G1: "hihat.mp3",
                A1: "tom1.mp3",
                B1: "tom2.mp3",
                C2: "tom3.mp3"
            },
            baseUrl: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/"
        }).toDestination();
        setSynth([piano, synth, piano, drums]);
    }

    const togglePlay = () => {

        isPlaying ? Tone.Transport.stop() : Tone.Transport.start();
        setIsPlaying((prevState) => !prevState);
        setPrevState(isPlaying);
    };

    const setTempo = (e) => {
        if (e.target.value > 10 && e.target.value < 400) {
            setBpm(e.target.value);
            if (Tone.Transport.state === "started") {
                Tone.Transport.bpm.rampTo(bpm, 0.1);
            }
        }
    }

    const audioContextStarted = () => {
        if (Tone.Context.state != "started") {
            return true;
        }
        return false;
    }

    const startContext = () => {
        Tone.start();
        Tone.Transport.scheduleRepeat(setNotes, "16n");
        Tone.Transport.bpm.value = 120;
        Tone.getDestination().volume.rampTo(0, 0.001);
        setIsActivated(true);
    }


    const data = {
        audioContextStarted,
        startContext,
        context,
        bpm,
        setTempo,
        togglePlay,
        isPlaying,
        position,
        setPosition,
        destination
    }

    return (
        <ToneContext.Provider value={data}>{children}</ToneContext.Provider>
    );
};

export { ToneContext, ToneProvider };


