import React, { useState, useEffect, useContext } from 'react'

import { Context } from '../Store'
import { Playlist } from './index'
import style from './playlists.module.css'

export default function Playlists() {
    const [state, dispatch] = useContext(Context)
    const [playlists, setPlaylists] = useState("Loading playlists")

    useEffect(() => {
        if (state.playlists.list.length > 0) {
            setPlaylists(state.playlists.list.map(playlist => <Playlist playlist={playlist} key={playlist.id}/> ))
        }
    }, [state.playlists])

    return <div className={style.container}>{playlists}</div>
}