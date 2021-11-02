import React, { createContext, useReducer } from 'react'

//Initial state
const initialState = {
    loggedIn: false,
    accessToken: {token: "", expires: ""},
    devices: {selected: {}, list: []},
    playlists: {selected: {}, list: []}
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
            return { ...state, devices: { ...state.devices, list: action.payload} }
        case "SET_SELECTED_DEVICE":
            return { ...state, devices: { ...state.devices, selected: action.payload} }
        case "SET_PLAYLISTS":
            return { ...state, playlists: { ...state.playlists, list: action.payload} }
        case "SET_SELECTED_PLAYLIST":
            return { ...state, playlists: { ...state.playlists, selected: action.payload} }
        default:
            console.log("Unknown action type")
            return state
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