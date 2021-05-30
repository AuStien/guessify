import React, { useState, useEffect } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { Redirect } from 'react-router-dom'

export default function Callback(props) {
  const location = useLocation()
  const [jsx, setJsx] = useState(<div>Special thanks to HeinrichJunge11 the love of my life</div>)

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
      setJsx(<Redirect to={{
        pathname: '/',
        state: {data}
      }}/>)
    })
  }, [])

  
  
  return(
      <div>
          {jsx}
      </div>
  )
}