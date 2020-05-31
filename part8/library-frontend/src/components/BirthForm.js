import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { ALL_AUTHORS } from './Authors'
import Select from 'react-select';
const SET_BIRTHYEAR = gql`
    mutation editAuthor($name:String!,$setBornTo:Int!){
        editAuthor(
            name:$name,
            setBornTo:$setBornTo){
                name
                born
            }
    }`
const BirthForm = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [updateAuthor] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })
    if (!authors) return null
    const editAge = async e => {
        e.preventDefault()
        updateAuthor({ variables: { name, setBornTo: +born } })
        setName('')
        setBorn('')
    }
    /*  const options = authors ? authors.data.allAuthors.map(author => {
         return { value: author.name, label: author.name }
     }) : [] */
    const handleChange = (name) => {
        setName(name.value)
    }
    // const { name: n } = name
    return (
        <div>
            {authors.data && authors.data.allAuthors.map(author => {
                return <form onSubmit={editAge}>
                    <Select
                        value={author.name}
                        onChange={handleChange}
                        options={author.name} />

                born:<input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)} />
                    <button type='submit'>update</button>
                </form>
            })}
        </div>
    )
}
export default BirthForm
