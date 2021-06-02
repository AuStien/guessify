import React, { createContext, useReducer } from 'react'

//Initial state
const initialState = {
    loggedIn: false,
    accessToken: {token: "", expires: ""},
    devices: [],
    playlists: []
}

//Reducer
export function Reducer(state, action) {
    switch(action.type) {
        case "SET_LOGGEDIN":
            return { ...state, loggedIn: action.payload }
        case "SET_ACCESSTOKEN":
            return { ...state, accessToken: action.payload }
        case "LOGIN":
            return { ...state, accessToken: action.payload, loggedIn: true }
        case "LOGOUT":
            return { ...state, accessToken: {token: "", expires: ""}, loggedIn: false }
        case "SET_DEVICES":
            return { ...state, devices: action.payload }
        case "SET_PLAYLISTS":
            return { ...state, playlists: action.payload }
    }
}

//Store
export const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

//Context
export const Context = createContext(initialState)