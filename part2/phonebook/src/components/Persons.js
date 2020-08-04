import React from 'react';
const shortid = require('shortid');

const Persons = ({ view, handleRemove }) => 
(
        <div>
            {
                view.map((person) =>
                    <div key={shortid.generate()} style={{ display: 'flex' }}>
                        <p key={person.id}>{`${person.name} ${person.number}`}</p>
                        <button onClick={handleRemove} id={person.id}>delete</button>
                    </div>)
            }

        </div>
    )

export default Persons;