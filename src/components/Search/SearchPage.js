import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Search.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './Search.css';

import Search from './Search';

const magGlass = <FontAwesomeIcon icon={ faMagnifyingGlass } />
const circleX = <FontAwesomeIcon icon={ faCircleXmark } />

function SearchPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
       // console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div>
          <div className='searchbar'>
            <form className='searchbar' onSubmit='return false'>
              <div className="magGlass">{magGlass}</div>
              <input type='text' 
                className='text-block' 
                onChange={handleChange} 
                placeholder="BTC... Bitcoin..." 
              />
              <button className="search-reset">
                {circleX}
                <input className='reset-input' type='reset' value='' />
              </button>
            </form>
          </div>
          {filteredCoins.map(coin => {
            return (
              <Search 
                key={coin.id}
                id={coin.id}
                symbol={coin.symbol}
                icon={coin.image}
                name={coin.name}
                data={coin}
              />
            )
          })}
      </div>

  )
}

export default SearchPage