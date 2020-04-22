import React from 'react'

const Filter = ({ search, changeSearch }) => {

    return (
        <div>
            <div>filter: <input
                value={search}
                onChange={changeSearch} /></div>

        </div>
    )
}
export default Filter