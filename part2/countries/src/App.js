import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

const App = () => {
  const [country, setCountry] = useState([])
  const [sear, setSear] = useState('')
  const [id, setId] = useState('')
  const [isActive, setActive] = useState(false)
  const search = (e) => {
    e.preventDefault()
    setSear(e.target.value)
  }
  const handleClick = (e) => {
    setActive(!isActive)
    setId(e.target.id)
  }


  const filt = country.filter(c => c.name.toLowerCase().startsWith(sear))
  const fin = country.find(country => country.name === id)
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {

        setCountry(response.data)
      })
      .catch(e => console.log(e))

  }, [])

  const fullInfo = filt.map((co, i) => {
    let capital = co.capital
    return <div key={i}>
      <h1>{`Country name: ${co.name}`}</h1>
      <p>{`Capital: ${co.capital}`}</p>
      <p>{`Population: ${co.population}`}</p>
      <p>{`Languages:`}</p>
      <ul>
        {co.languages.map((c, i) => {
          return <li key={c.name.toString()}>{c.name}</li>
        })}
      </ul>
      <img style={{ width: 300, height: 300 }} src={co.flag} alt='flag' />
      <Weather capital={capital} />
    </div>
  })

  const show = sear.length === 0 ? null : filt.length > 10 ? <div>Be more specific</div> : filt.length > 1 ?
    <div>

      {
        filt.map((co, i) => {
          return <div key={co.name} style={{ display: 'flex' }}>
            {co.name}
            <button id={co.name} onClick={handleClick}>{isActive ? 'Show less' : 'Show more'}</button>

          </div>
        })}


    </div>
    :
    <div>
      {fullInfo}
    </div>

  return (
    <div>
      <div>
        Find countries:<input
          value={sear}
          onChange={search} />
      </div>
      {show}
      {
        isActive && (<section>

          <h1>{`Country name: ${fin.name}`}</h1>
          <p>{`Capital: ${fin.capital}`}</p>
          <p>{`Population: ${fin.population}`}</p>
          <p>{`Languages:`}</p>
          <ul>
            {fin.languages.map((f, i) => {
              return <li key={i}>{f.name}</li>
            })}
          </ul>
          <img style={{ width: 300, height: 300 }} src={fin.flag} alt='flag' />
          <Weather capital={fin.capital} />
        </section>)

      }

    </div>
  )
}

export default App

/*Search country: <input
        value={name}
        onChange={setName} />*/

//{if(display) <p key={i}>{co.name}</p>}