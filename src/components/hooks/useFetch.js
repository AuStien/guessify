import { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { Context } from '../../Store'

export function useFetch() {
    const [cookies, setCookie, removeCookie] = useCookies(["refresh-token"])
    const [state, dispatch] = useContext(Context)

    async function f(type, payload) {

        //Less than 10s till token expires
        if (Date.parse(state.accessToken.expires) - Date.now() <= 10000) {
            await refresh(cookies, setCookie, dispatch)
        }
        
        switch(type) {
            case "play":
                return play(state, payload)
            case "callback":
                return callback(payload.code, payload.redirectUri, dispatch, setCookie)
            case "refresh":
                return refresh(cookies, setCookie, removeCookie, dispatch)
            case "user":
                return user(state)
            case "playlists":
                return playlists(state)
            case "devices":
                return devices(state)
            case "base":
                return base(state)
        }
    }

    return f
}

async function play(state, playlist) {
    return new Promise((res, rej) => {
        console.log("devices_id", state.devices.selected.id)
        console.log("ac", state.accessToken.token)
        console.log("context-uri", playlist.uri)
        fetch("https://paastien.no/gettify/play?device_id=" + state.devices.selected.id, {
            method: "PUT",
            headers: {
                "access-token": state.accessToken.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "context-uri": playlist.uri
            })
        })
        .then(response => response.json())
        .then(data => res(data))
        .catch(e => rej(e))
    })   
}

async function user(state) {
    return new Promise((res, rej) => {
        fetch("https://paastien.no/gettify/user", {
                method: "GET",
                headers: {
                    "access-token": state.accessToken.token
                }
            })
            .then(response => response.json())
            .then(data => res(data))
            .catch(e => rej(e))
    })
}

async function playlists(state) {
    return new Promise((res, rej) => {
        fetch('https://paastien.no/gettify/playlist', {
            method: 'GET',
            headers: {
                'access-token': state.accessToken.token
            }
        })
        .then(response => response.json())
        .then(data => res(data))
        .catch(e => rej(e))
    })
}

async function devices(state) {
    return new Promise((res, rej) => {
        fetch('https://paastien.no/gettify/devices', {
            method: 'GET',
            headers: {
                'access-token': state.accessToken.token
            }
        })
        .then(response => response.json())
        .then(data => res(data))
        .catch(e => rej(e))
    })
}

async function callback(code, redirectUri, dispatch, setCookie) {
    return new Promise((res, rej) => {
        fetch('https://paastien.no/gettify/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                redirectUri: redirectUri
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dispatch({type: "SET_LOGGEDIN", payload: true})
            dispatch({type: "SET_ACCESSTOKEN", payload: {token: data.accessToken, expires: data.expires}})
            setCookie("refresh-token", data.refreshToken, {maxAge: 365 * 24 * 60 * 60})
            res(data)
        })
        .catch(e => rej(e))
    })
}

async function refresh(cookies, setCookie, removeCookie, dispatch) {
    return new Promise((res, rej) => {
        fetch("https://paastien.no/gettify/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "refresh-token": cookies["refresh-token"]
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Token refreshed") //DEVELOPMENT
            if (data.refreshToken) {
                setCookie("refresh-token", data.refreshToken, {maxAge: 365 * 24 * 60 * 60})
            }
            dispatch({type: "LOGIN", payload: {token: data.accessToken, expires: data.expires}})
            res(data)
        })
        .catch(e => {
            dispatch({type: "LOGOUT"})
            removeCookie("refresh-token")
            rej(e)
        })
    })
}

async function base(state) {
    return new Promise(res => {
        fetch("https://paastien.no/gettify/")
        .then(resp => {
            console.log("Got base", state.loggedIn) //DEVELOPMENT
            res(resp)
        })
    })
}