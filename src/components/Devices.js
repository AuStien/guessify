import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'

import { Context } from '../Store'

export default function Devices() {
    const [state, dispatch] = useContext(Context)
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState()

    useEffect(() => {
        if (state.devices.length > 0) {
            setOptions(state.devices.map(device => { return {value: device.id, label: device.name} }))
        }
    }, [state.devices])

    return <Select 
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select which device to use"
        />
}