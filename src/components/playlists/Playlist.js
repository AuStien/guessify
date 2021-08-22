import React, { useContext } from 'react'
import styled from 'styled-components'

import { useFetch } from '../hooks/useFetch'
import { Context } from '../../Store'

export default function Playlist({playlist}) {
    const f = useFetch()
    const [state, dispatch] = useContext(Context)

    function handleClick() {
        dispatch({type: "SET_SELECTED_PLAYLIST", payload: playlist})
        if (state.devices.selected.id) {
            f("play", playlist)
        }
    }

    return <Frame onClick={() => handleClick()} >
        <ImageFrame src={playlist.images[0].url} alt={playlist.name} />
        <p>{playlist.name}</p>
    </Frame>
}

const Frame = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    padding: 4px;
    margin: 5px;
    width: 150px;
    &:hover {
        cursor: pointer;
    }
`;

const ImageFrame = styled.img`
    max-width: 100%;
    max-height: 100%;
`;