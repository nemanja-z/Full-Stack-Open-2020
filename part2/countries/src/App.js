import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';
import Country from './components/Country';


const App = () => {
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState('');
  const [id, setId] = useState('');
  const [isActive, setActive] = useState(false);
  const searchForCountry = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }
  const handleClick = (e) => {
    setActive(!isActive);
    setId(e.target.id);
  }

  const filteredCountries = country.filter(c => c.name.toLowerCase().startsWith(search));
  const findCountry = country.find(country => country.name === id);
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => 
        setCountry(response.data)
      )
      .catch(e => console.log(e))

  }, [])

  
  const show = search.length === 0 ? null: 
            filteredCountries.length > 10 ? 
            <span>Be more specific</span> : 
            filteredCountries.length > 1 ?
            <CountryList countries={filteredCountries} isActive={isActive} handleClick={handleClick}/>:
            <CountryDetails country={filteredCountries}/>

  return (
    <div>
      <header>
        Find countries:<input
          value={search}
          onChange={searchForCountry} />
      </header>
      <main>
      {show}
      {isActive && <Country country={findCountry}/>}
      </main>
    </div>
  )
}

export default App;