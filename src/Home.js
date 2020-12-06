import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

export default function Home(props) {
    const location = useLocation()
    useEffect(() => {
        console.log(location.state)
    }, [location.state])

    return(<a href='http://localhost:5000/login?redirect=http://localhost:3000/callback'>Login</a>)
}