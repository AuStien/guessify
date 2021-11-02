import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'

import { Context } from '../../Store'
import { useFetch } from '../hooks/useFetch'
import { Devices } from '../index'

export default function Header() {
    const [state, dispatch] = useContext(Context)
    const [username, setUsername] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["refresh-token"])
    const f = useFetch()

    useEffect(() => {
        if (cookies["refresh-token"] && cookies["refresh-token"] !== "undefined") {
            f("refresh")
        }
    }, [])

    useEffect(() => {
        if(state.accessToken.token !== "") {
            //Get user
            f("user")
            .then(data => {
                setUsername(data.display_name)
            })

            //Get devices
            f("devices")
            .then(data => {
                console.log("devices", data)
                dispatch({type: "SET_DEVICES", payload: data.devices})
            })

            //Get playlists
            f("playlists")
            .then(data => {
                console.log("playlists", data)
                dispatch({type: "SET_PLAYLISTS", payload: data})
            })

        }
    }, [state.accessToken.token])

    function logout() {
        dispatch({type: "LOGOUT"})
        setUsername("")
        removeCookie("refresh-token")
    }

    return(
        <Frame>
            <div>
                <a href="/" >Home</a>
            </div>
            {state.loggedIn ?
                <React.Fragment>
                    <h3>Greetings, {username}! <button onClick={() => logout()}>Logout</button></h3>
                    <Devices />
                </React.Fragment>
            :
                <a href='https://paastien.no/gettify/login?redirect=http://localhost:3000/callback'>Login</a>
            }
        </Frame>
    )
}

const Frame = styled.div`
    padding: 5px;
    top: 0;
    margin-top: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;