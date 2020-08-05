import React from 'react';

const CountryList=({isActive,countries,handleClick})=>(
    <>
    {countries.map((country) =>
    <div key={country.name} style={{ display: 'flex' }}>
        <p>{country.name}</p>
        <button id={country.name} onClick={handleClick}>{isActive ? 'Show less' : 'Show more'}</button>
    </div>)}
    </>)

export default CountryList;