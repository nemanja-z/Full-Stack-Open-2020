import React from 'react';

const Filter = ({ search, changeSearch }) => (
        <div>
            <div>filter: <input
                value={search}
                onChange={changeSearch} /></div>

        </div>
    )
export default Filter;