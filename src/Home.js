import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

export default function Home(props) {
    const location = useLocation()
    useEffect(() => {
        console.log(location.state)
    }, [location.state])

    return(<a href='https://paastien.no/gettify/login?redirect=http://localhost:3000/callback'>Login</a>)
}