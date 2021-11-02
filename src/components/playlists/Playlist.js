import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'

export default function Playlist({playlist}) {
    const history = useHistory()

    function handleClick() {
        history.push("/guess/playlist/" + playlist.id)
    }

    return <Frame onClick={() => handleClick()} >
        <ImageFrame src={playlist.images[0].url} alt={playlist.name} />
        <p>{playlist.name}</p>
    </Frame>
}

const Frame = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    padding: 4px;
    margin: 5px;
    width: 150px;
    &:hover {
        cursor: pointer;
    }
`;

const ImageFrame = styled.img`
    max-width: 100%;
    max-height: 100%;
`;