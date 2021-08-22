import React, { useContext } from 'react'

import { Context } from '../../Store'
import { Playlists } from '../index'

export default function Home() {
    const [state, dispatch] = useContext(Context)
    
    return(
        <React.Fragment>
            {state.loggedIn &&
            <React.Fragment>
                <Playlists />
            </React.Fragment>
            }
        </React.Fragment>
    )
}