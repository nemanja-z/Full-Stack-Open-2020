import React from 'react'

export const Persons = ({ view, handleRemove }) => {
    return (
        <div>
            {
                view.map((p, id) =>
                    <div key={id} style={{ display: 'flex' }}>
                        <p key={id}>{`${p.name} ${p.number}`}</p>
                        <button onClick={handleRemove} id={id}>delete</button>
                    </div>)
            }

        </div>
    )
}
export default Persons