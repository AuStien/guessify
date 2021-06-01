import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { Redirect, useLocation } from 'react-router-dom'

import { useFetch } from '../hooks/useFetch'

export default function Callback() {
  const location = useLocation()
  const [jsx, setJsx] = useState(<div>Loading...</div>)
  const f = useFetch()

  useEffect(() => {
    f("callback", {code: queryString.parse(location.search).code, redirectUri: 'http://localhost:3000/callback'})
    setJsx(<Redirect to="/"/>)
  }, [])

  return(
      <React.Fragment>
          {jsx}
      </React.Fragment>
  )
}