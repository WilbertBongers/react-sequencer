import React, { useState } from 'react';
import './style.scss';
import {
    Group,
    Rect,
} from "react-konva";

const SingleNote = ({ note, scale, size, key, onNoteChanged }) => {

    const offset = size.center - 0.5 * scale.notes * scale.vertical;
   
    const [dimension, setDimension] = useState({
        X: note.step * scale.horizontal + size.margin,
        Y: offset + scale.vertical * ( scale.low - note.note - 1 + scale.notes ) / 2,
        Width: note.duration * scale.horizontal,
        Scale: scale,
        HandleX: (note.step * scale.horizontal + size.margin + note.duration * scale.horizontal - 8),
        HandleY: offset + scale.vertical * ( scale.low - note.note + scale.notes ),
    })

    const [dragBusy, setDragBusy] = useState(false);
    const [startValue, setStartValue] = useState({
        X: null,
        Y: null,
        Width: null,
        StartDragX: null,
        StartDragY: null,
    });

    function handleDragStart({ evt }) {
        setDragBusy(true);
        setStartValue({
            X: dimension.X,
            Y: dimension.Y,
            Width: dimension.Width,
            HandleX: dimension.HandleX,
            StartDragX: evt.offsetX,
            StartDragY: evt.offsetY,
        })
    }

    function handleDragEndNote() {

        if (!dragBusy) {
            return
        }
        else {
            onNoteChanged(dimension);
            setDimension({
                ...dimension,

            });
            setDragBusy(false);
        }
    }

    function getNewlyCalculatedWidth(evt) {

        const delta = +evt.offsetX - +startValue.StartDragX;
        const newlyCalcWidth = +delta + +startValue.Width;

        return newlyCalcWidth > 16 ? newlyCalcWidth : 16;
    }

    function handleDragMoveHandler({ evt }) {
        if (!dragBusy) {
            return
        }
        else {
            let newX = this.attrs.x;
            if (this.attrs.x < dimension.X + 8) {
                newX = dimension.X + 8;
            }
            this.attrs.x = newX;
            this.attrs.y = dimension.Y;
            setDimension({
                ...dimension,
                Width: getNewlyCalculatedWidth(evt),
            });
        }
    }

    function handleDragEndHandler() {

        if (!dragBusy) {
            return
        }
        else {
            onNoteChanged(dimension);
            setDragBusy(false);
            setStartValue({
                X: null,
                Y: null,
                Width: null,
                StartDragX: null,
                StartDragY: null,
            });

        }
    }
    return (
        <Group
            x={dimension.X}
            y={dimension.Y}
            width={dimension.Width}
            height={dimension.Scale.vertical}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEndNote}
        >
            <Rect
                fill={"orange"}
                x={dimension.X}
                y={dimension.Y}
                width={dimension.Width}
                height={dimension.Scale.vertical}
                key={key}
            />
            <Rect
                fill="Red"
                x={dimension.HandleX}
                y={dimension.Y}
                width={8}
                height={dimension.Scale.vertical}
                draggable
                onDragStart={handleDragStart}
                onDragMove={handleDragMoveHandler}
                onDragEnd={handleDragEndHandler}
            />
        </Group>
    );

};

export default SingleNote;