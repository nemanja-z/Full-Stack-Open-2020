import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries';
import Select from 'react-select';

const BirthForm = ({ authors }) => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [updateAuthor] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    });
    if (!authors) return null;
    const editAge = async e => {
        e.preventDefault();
        updateAuthor({ variables: { name, setBornTo: +born } });
        setName('');
        setBorn('');
    }
    const options = authors.map(author => {
        return { value: author.name, label: author.name };
    })
    const handleChange = (name) => {
        setName(name.value);
    }
    const { name: n } = name;
    return (
        <div>
            <form onSubmit={editAge}>
                <Select
                    value={n}
                    onChange={handleChange}
                    options={options} />

                born:<input
                    value={born}
                    onChange={({ target }) => setBorn(target.value)} />
                <button type='submit'>update</button>
            </form>

        </div>
    )
}
export default BirthForm;
