import React from 'react'
import { useParams } from 'react-router-dom'


function OutBon() {

    const { id } = useParams()

    return (
        <div>
           test {id}
        </div>
    )
}

export default OutBon