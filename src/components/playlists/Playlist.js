import React, { useContext, useEffect } from 'react'

import style from './playlist.module.css'
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

    return <div className={style.container} onClick={() => handleClick()} >
        <img className={style.img} src={playlist.images[0].url} alt={playlist.name} />
        <p className={style.title}>{playlist.name}</p>
    </div>
}