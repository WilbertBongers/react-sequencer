import React from 'react';
import './style.scss';
import useSong from '../../hooks/useSong';
import Enumerable from 'linq';
import SingleTrack from '../SingleTrack/SingleTrack'
function TrackDisplay() {

    const { song, adjustTrack } = useSong();


    const selectTrack = (e, id) => {
        const selected = Enumerable.from(song.tracks)
            .where(t => t.track === id)
            .select(t => ({
                ...t,
                selected: true,
            }))

        const unselected = Enumerable.from(song.tracks)
            .where(t => t.track !== id)
            .select(t => ({
                ...t,
                selected: false,
            }))
            .toArray()

        adjustTrack({
            "tracks": Enumerable.from(selected)
                .union(unselected)
                .orderBy(t => t.track)
                .toArray()
        });
    }

    const setMute = (e, id) => {
        e.stopPropagation();
        const selected = Enumerable.from(song.tracks)
            .where(t => t.track === id)
            .select(t => ({
                ...t,
                mute: t.solo === true ? false : !t.mute,
            }))
        const unselected = Enumerable.from(song.tracks)
            .where(t => t.track !== id)
            .select(t => ({
                ...t,
            }))
            .toArray()

        adjustTrack({
            "tracks": Enumerable.from(selected)
                .union(unselected)
                .orderBy(t => t.track)
                .toArray()
        });
    }

    const setSolo = (e, id) => {

        e.stopPropagation();
        let unselected;

        const selected = Enumerable.from(song.tracks)
            .where(t => t.track === id)
            .select(t => !t.solo)
            .firstOrDefault()

        const selectedTrack = Enumerable.from(song.tracks)
            .where(t => t.track === id)
            .select(t => ({
                ...t,
                solo: !t.solo,
                mute: false,
            }))
            .toArray()

        if (selected === true) {
            unselected = Enumerable.from(song.tracks)
                .where(t => t.track !== id)
                .select(t => ({
                    ...t,
                    solo: false,
                    mute: true,
                }))
                .toArray()
        } else {
            unselected = Enumerable.from(song.tracks)
                .where(t => t.track !== id)
                .select(t => ({
                    ...t,
                    solo: false,
                    mute: false,
                }))
                .toArray()
        }

        adjustTrack({
            "tracks": Enumerable.from(selectedTrack)
                .union(unselected)
                .orderBy(t => t.track)
                .toArray()
        });
    }

    return (
        <ul className="track-list">
            {song.tracks.map((track) => (
                <SingleTrack
                    key={track.track}
                    track={track}
                    onSolo={e => setSolo(e, track.track)}
                    onMute={e => setMute(e, track.track)}
                    onPress={e => selectTrack(e, track.track)}
                    id={track.track}
                />
            ))}
        </ul>
    );
}

export default TrackDisplay;
