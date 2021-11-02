import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { useFetch } from '../hooks/useFetch'
import { Context } from '../../Store'

export default function Guess() {
    const { id } = useParams()
    const f = useFetch()
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
        if(!state.playlists.selected || id != state.playlists.selected.id) {
            if(state.playlists.list) {
                for(let p of state.playlists.list) {
                    if (p.id == id) {
                        dispatch({type: "SET_SELECTED_PLAYLIST", payload: p})
                        break
                    }
                }
            }
        }
    }, [state.playlists.list])

    useEffect(() => {
        if(state.playlists.selected) {
            f("play", state.playlists.selected)
        }
    }, [state.playlists.selected])

    if(!state.playlists.selected.name) return <h1>Loading</h1>

    return (
        <Frame>
            <h1>Playing from '{state.playlists.selected.name}'</h1>
        </Frame>
    )
}

const Frame = styled.div`

`;