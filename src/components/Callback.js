import React, { useState, useEffect, useContext } from 'react'
import queryString from 'query-string'
import { Redirect, useLocation } from 'react-router-dom'

import { Context } from '../Store'

export default function Callback(props) {
  const [state, dispatch] = useContext(Context)
  const location = useLocation()
  const [jsx, setJsx] = useState(<div>Loading...</div>)

  useEffect(() => {
    fetch('https://paastien.no/gettify/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: queryString.parse(location.search).code,
        redirectUri: 'http://localhost:3000/callback'
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dispatch({type: "SET_LOGGEDIN", payload: true})
      dispatch({type: "SET_ACCESSTOKEN", payload: data.accessToken})
      
      setJsx(<Redirect to={{
        pathname: '/',
        state: {data}
      }}/>)
    })
  }, [])

  
  
  return(
      <React.Fragment>
          {jsx}
      </React.Fragment>
  )
}