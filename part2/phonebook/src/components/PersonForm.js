import React from 'react';

const PersonForm = ({ addName, newName, handleChange, newNumber, handleNum }) =>  (
        <div>
            <form onSubmit={addName}>
                <div>
                    name:   <input
                            value={newName}
                            onChange={handleChange} />
                </div>
                <div>
                    number: <input
                            value={newNumber}
                            onChange={handleNum} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )

export default PersonForm;
