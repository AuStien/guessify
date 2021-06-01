import { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { Context } from '../../Store'

export function useFetch() {
    const [cookies, setCookie] = useCookies(["refresh-token"])
    const [state, dispatch] = useContext(Context)

    async function f(type, payload) {

        //Less than 10s till token expires
        if (Date.parse(state.accessToken.expires) - Date.now() <= 10000) {
            await refresh(cookies, setCookie, dispatch)
        }
        
        switch(type) {
            case "play":
                return play(state, payload.contextUri, payload.deviceId)
            case "callback":
                return callback(payload.code, payload.redirectUri, dispatch, setCookie)
            case "refresh":
                return refresh(cookies, setCookie, dispatch)
            case "user":
                return user(state)
            case "base":
                return base(state)
        }
    }

    return f
}

//Example maybe??
async function play(state, contextUri, deviceId = "") {
    return new Promise(res => {
        fetch("https://paastien.no/gettify/play", {
            method: "GET",
            headers: {
                "access-token": state.accessToken.token
            },
            body: {
                "context-uri": contextUri,
                "device-id": deviceId
            }
        })
        .then(response => response.json())
        .then(data => res(data))
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
        })
        .catch(e => rej(e))
    })
}

async function refresh(cookies, setCookie, dispatch) {
    return new Promise(res => {
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
    })
}

async function base(state) {
    return new Promise(res => {
        fetch("https://paastien.no/gettify/")
        .then(resp => {
            console.log("Got base", state.loggedIn) //DEVELOPMENT
        })
    })
}