import React from 'react';
import Weather from './Weather';
const CountryDetails =({country})=>(
    <section key={country.name}> 
        {country.map(co=>
        <React.Fragment key={co.name}>    
            <h1>{`Country name: ${co.name}`}</h1>
            <p>{`Capital: ${co.capital}`}</p>
            <p>{`Population: ${co.population}`}</p>
            <p>{`Languages:`}</p>
            <ul>
                {co.languages.map(c => 
                <li key={c.name}>{c.name}</li>
                )}
            </ul>
            <img style={{ width: 300, height: 300 }} src={co.flag} alt='flag' />
            <Weather capital={co.capital} />
        </React.Fragment>)}
    </section>)


export default CountryDetails;