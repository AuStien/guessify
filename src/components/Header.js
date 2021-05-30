import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Store'

export default function Header() {
    const [state, dispatch] = useContext(Context)
    const [username, setUsername] = useState("")

    useEffect(() => {
        if(state.accessToken !== "") {
            fetch("https://paastien.no/gettify/user", {
                method: "GET",
                headers: {
                    "access-token": state.accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsername(data.display_name)
            })
        }
    }, [state.accessToken])

    function logout() {
        dispatch({type: "SET_LOGGEDIN", payload: false})
        dispatch({type: "SET_ACCESSTOKEN", payload: ""})
        setUsername("")
    }

    return(
        <React.Fragment>
            <p>Accesstoken: {state.accessToken}</p>
            {state.loggedIn ? <h1>Greetings, {username}! <span onClick={() => logout()}>Logout</span></h1> : <a href='https://paastien.no/gettify/login?redirect=http://localhost:3000/callback'>Login</a>}
        </React.Fragment>
    )
}