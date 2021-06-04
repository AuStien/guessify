import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { Context } from '../Store'
import { useFetch } from './hooks/useFetch'
import style from './header.module.css'

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
            f("user")
            .then(data => {
                setUsername(data.display_name)
            })
        }
    }, [state.accessToken.token])

    function logout() {
        dispatch({type: "LOGOUT"})
        setUsername("")
        removeCookie("refresh-token")
    }

    return(
        <React.Fragment>
            {state.loggedIn ? <h3>Greetings, {username}! <button onClick={() => logout()}>Logout</button></h3> : <a href='https://paastien.no/gettify/login?redirect=http://localhost:3000/callback'>Login</a>}
            <button onClick={() => f("base")}>Base</button>
        </React.Fragment>
    )
}