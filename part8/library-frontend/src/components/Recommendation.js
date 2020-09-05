import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../queries';

const Recommendation = ({ show, book }) => {
    const [userInfo, setUserInfo] = useState(null);
    const user = useQuery(ME);

    useEffect(() => {
        if (user.data) {
            setUserInfo({ username: user.data.me.username, favoriteGenre: user.data.me.favoriteGenre });

        }
    }, [user.data])

    if (!show) return null;
    if (!user.data.me) return null;
    return (
        <div>
            <h2>Recommendations based on your favorite genre</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
            </th>
                        <th>
                            published
            </th>
                    </tr>
                    {book.filter(book => {
                        for (let b of book.genres) {
                            if (b.toLowerCase().includes(userInfo.favoriteGenre.toLowerCase())) return b
                        }
                        return null
                    }).map(book => {
                        return (<tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>)


                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendation;