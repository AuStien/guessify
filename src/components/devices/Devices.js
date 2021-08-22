import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'

import { Context } from '../../Store'

export default function Devices() {
    const [state, dispatch] = useContext(Context)
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (state.devices.list.length > 0) {
            setOptions(state.devices.list.map(device => { return {value: device, label: device.name} }))
        }
    }, [state.devices.list])

    useEffect(() => {
        if (options && !selected) {
            setSelected(options[0])
        }
    }, [options])

    useEffect(() => {
        if (selected) {
            if ((state.devices.selected && (state.devices.selected.id !== selected.value.id)) || !state.devices.selected) {
                console.log("change", selected.value.name)
                dispatch({type: "SET_SELECTED_DEVICE", payload: selected.value})
            }
        }
    }, [selected])

    return <SelectFrame 
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select which device to use"
        noOptionsMessage={() => "No active devices"}
        isSearchable={false}
        />
}

const SelectFrame = styled(Select)`
    width: 400px;
`