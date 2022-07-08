import React from 'react';
import './style.scss';
import useSong from '../../hooks/useSong';
import Enumerable from 'linq';
import SingleChannel from '../SingleChannel/SingleChannel';

function Mixer() {  

    const { song, adjustTrack } = useSong();

    const setTrackVolume = (value, id) => {

        const changed= Enumerable.from(song.tracks)
            .where(t => t.track === id)
            .select(t => ({
                ...t,
                volume: value
            }))

        const unchanged= Enumerable.from(song.tracks)
            .where(t => t.track !== id)
            .select(t => ({
                ...t,
            
           }))
            .toArray()

        adjustTrack({
            "tracks": Enumerable.from(changed)
                .union(unchanged)
                .orderBy(t => t.track)
                .toArray()
        });
    }

    return (
        <div className="channel-container">
            {song.tracks.map((track, index) => (
                <SingleChannel
                    type={"channel"}
                    track={track}
                    key={'channel_' + index}
                    onSlide={e => setTrackVolume(e.target.value, track.track)}
                />
            ))}

            <SingleChannel
                type={"master"}
                track={{ "name": "Master" }}
                key={'master_1'}
                onSlide={e => setTrackVolume(e.target.value, "master")}
            />
        </div>
    );
}

export default Mixer;