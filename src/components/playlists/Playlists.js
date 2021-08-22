import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { Context } from '../../Store'
import { Playlist } from '../index'

export default function Playlists() {
    const [state, dispatch] = useContext(Context)
    const [playlists, setPlaylists] = useState("Loading playlists")

    useEffect(() => {
        if (state.playlists.list.length > 0) {
            setPlaylists(state.playlists.list.map(playlist => <Playlist playlist={playlist} key={playlist.id}/> ))
        }
    }, [state.playlists])

    return <Frame>{playlists}</Frame>
}

const Frame = styled.div`
    display: flex;
    flex-wrap: wrap;
`;