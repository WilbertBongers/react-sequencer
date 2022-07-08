import React from 'react';
import './style.scss';
import {
    Line,
    Layer
} from "react-konva";

const PositionPointer = ({ xPos, size }) => {

    return (
        <Layer>
            <Line points={[xPos, 0,  xPos, size.height]} stroke="red" strokeWidth={2} tension={1} />
        </Layer>
    );
};

export default PositionPointer;