import React from "react";
import "./style.scss";
import { Line, Layer, Text, Rect } from "react-konva";
import notes from "../../resources/midinotes.json";

const DrawGrid = ({size, scale, onUserClick}) => {
 
    const textSize = 20;
    const offset = size.center - 0.5 * scale.notes * scale.vertical;
    const totalWidth = scale.horizontal *  scale.duration;

    return (
        <Layer onClick={onUserClick} >
            {[...Array(scale.notes)].map((x, index) =>
                <Rect x={size.margin} y={offset + scale.vertical * (scale.notes - index -1)} width={totalWidth} height={scale.vertical} stroke="black" id={"_"+(index + scale.low)} fill={scale.noteAnnotation && notes[index + scale.low][1].includes("#") ? "gray" : "white"} strokeWidth={0.3} />
            )}
            
            {[...Array(scale.duration + 1)].map((x, index) =>
                <>
                    {+index % 16 === 0 && <Text x={index * scale.horizontal + size.margin} y={5} width={textSize * 0.5} height={textSize} text={Math.floor(index/16) + 1}  verticalAlign="middle" />}
                    {<Line points={[index * scale.horizontal + size.margin, offset,  index * scale.horizontal + size.margin, size.height - offset]} stroke="black" strokeWidth={0.2} tension={1} key={index} />}
                    {+index % 4 === 0 && <Line points={[index * scale.horizontal + size.margin, offset,  index * scale.horizontal + size.margin, size.height - offset]} stroke="black" strokeWidth={0.2} tension={1} key={"beat"+index} />}
                    {+index % 16 === 0 && <Line points={[index * scale.horizontal + size.margin, offset - 10,  index * scale.horizontal + size.margin, size.height - offset]} stroke="#05C8F0" strokeWidth={2} tension={1} key={"bar"+index} />}
                </>
            )}

        </Layer>
    );
};

export default DrawGrid;