import React, { useState, useEffect } from "react";
import "./style.scss";
import useSong from "../../hooks/useSong";
import SingleNote from "../SingleNote/SingleNote";
import { translateBarBeatsSixteens2Ticks } from "../../helpers/Util";
import DrawGrid from "../DrawGrid/DrawGrid";
import Enumerable from "linq";
import { Stage, Layer } from "react-konva";
import PositionPointer from "../PositionPointer/PositionPointer";
import useTone from "../../hooks/useTone";
import { GridSettings } from "./GridSettings.js";
import notes from "../../resources/midinotes.json";

function GridEdit() {

    const [size, setSize] = useState({
        width: 0,
        height: 0,
        center: 0,
        margin: 20,
        text: 20,
    });
    const [scale, setScale] = useState({
        horizontal: 12,
        vertical: 8,
        notes: 48,
        duration: 128,
        low: 48,
        high: 96
    });
    const [selectedTrack, setSelectedTrack] = useState({
        track: "",
        mute: false,
        solo: false,
        selected: false,
        name: "",
        grid: "Piano",
        notes: []
    });
    const { song, adjustSong, adjustTrack } = useSong();
    const { position } = useTone();


    useEffect(() => {
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => { window.removeEventListener('resize', checkSize) };

    }, []);

    useEffect(() => {
        getSelectedTrack();
        adjustScale();
    }, [selectedTrack, scale, song]);


    const getSelectedTrack = () => {
        const track = Enumerable.from(song.tracks)
            .where(t => t.selected === true)
            .firstOrDefault(song.tracks[0]);
        setSelectedTrack(track);

    }

    const checkSize = () => {
        const gridContainer = document.querySelector("#grid-container");
        setSize({
            ...size,
            width: gridContainer.offsetWidth,
            height: gridContainer.offsetHeight,
            center: 0.5 * gridContainer.offsetHeight,
        });
    };

    const adjustScale = () => {
        const setting = Enumerable.from(GridSettings)
            .where(g => g.name === selectedTrack.grid)
            .select(g => g.setting)
            .firstOrDefault();
        setScale(setting);
    }

    const noteChangedHandler = (dimension, id) => {
        console.log(dimension);
        const changedNote = Enumerable.from(selectedTrack.notes)
            .where(n => n.id === id)
            .firstOrDefault(null)
    console.log(size)
        changedNote.duration = Math.floor(dimension.Width / dimension.Scale.horizontal);
        changedNote.step = Math.floor((size.width - size.margin) / dimension.X);
        changedNote.note = 48;

        console.log(selectedTrack.notes);
        const unselected = Enumerable.from(song.tracks)
            .where(t => t.track !== selectedTrack.id)
            .toArray()

        adjustTrack({
            "tracks": Enumerable.from([selectedTrack])
                .union(unselected)
                .orderBy(t => t.track)
                .toArray()
        });
    }

    const noteRemoveHandler = (note) => {
        console.log(note);
        for(let i=0;i<selectedTrack.notes.length; i++){
            selectedTrack.notes.splice(i,1);
        }

        const unselected = Enumerable.from(song.tracks)
            .where(t => t.track !== selectedTrack.id)
            .toArray()

        adjustTrack({
            "tracks": Enumerable.from([selectedTrack])
                .union(unselected)
                .orderBy(t => t.track)
                .toArray()
        });
    }

    const clickHandler = (e) => {
        const step = Math.floor((e.evt.offsetX - size.margin) / scale.horizontal );
        const pitch = e.target.attrs.id.replace('_', '');

        const newNote = {
            "id": selectedTrack.notes.length,
            "duration": "2",
            "name": notes[pitch],
            "note": pitch,
            "step": step,
            "velocity": 0.75
        };
        selectedTrack.notes.push(newNote);

        const unselected = Enumerable.from(song.tracks)
            .where(t => t.track !== selectedTrack.id)
            .toArray()

        adjustTrack({
            "tracks": Enumerable.from([selectedTrack])
                .union(unselected)
                .orderBy(t => t.track)
                .toArray()
        });
    }


    return (
        <Stage width={scale.horizontal * scale.duration + (2 * size.margin)} height={size.height}>
            <DrawGrid size={size} scale={scale} onUserClick={(e) => clickHandler(e)} />
            <Layer >
                {selectedTrack.notes.map((note) => (
                    <SingleNote
                        note={note}
                        scale={scale}
                        size={size}
                        key={note.id}
                        onNoteChanged={(dimension) => noteChangedHandler(dimension, note.id)}
                        onNoteDoubleClicked={(note) => noteRemoveHandler(note)}
                    />
                ))}
            </Layer>
            <PositionPointer size={size} xPos={translateBarBeatsSixteens2Ticks(position) * scale.horizontal} />
        </Stage>
    );
};

export default GridEdit;