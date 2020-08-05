import React from 'react';
import Weather from './Weather';
const Country =({country})=>(
    <section key={country.name}>
        <React.Fragment key={country.name}>    
            <h1>{`Country name: ${country.name}`}</h1>
            <p>{`Capital: ${country.capital}`}</p>
            <p>{`Population: ${country.population}`}</p>
            <p>{`Languages:`}</p>
            <ul>
                {country.languages.map(c => 
                <li key={c.name}>{c.name}</li>
                )}
            </ul>
            <img style={{ width: 300, height: 300 }} src={country.flag} alt='flag' />
            <Weather capital={country.capital} />
        </React.Fragment>
    </section>)


export default Country;