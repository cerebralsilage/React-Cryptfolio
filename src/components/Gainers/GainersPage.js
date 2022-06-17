import React, { useEffect, useState } from 'react';
import Axios from "axios";
import './Gainers.css';

import Gainers from './Gainers';

function GainersPage() {

  const [listOfCoins, setListOfCoins] = useState([]);


  useEffect(() => {
    Axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
    .then(response => {
        setListOfCoins(response.data);
      //  console.log(response.data);
      })
      .catch(error => console.log(error));
  }, []); 

  function numberWithCommas(num) {
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return num;
    }
  } 

  function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(2) + 'K'; 
    } else if(num > 999999 && num < 1000000000){
        return (num/1000000).toFixed(2) + 'M'; 
    } else if(num > 1000000000){
        return (num/1000000000).toFixed(2) + 'B' 
    }
  }

  const newList = listOfCoins.sort( function(a, b) {
    const aValue = Number(a['price_change_percentage_24h']);
    const bValue = Number(b['price_change_percentage_24h']);
    return aValue - bValue;
  }); 

const reversedNewList = newList.reverse();

  return (
    <div>
      <div className="gainers-top">
          <p>Coin</p>
          <p className="gainers-top-middle">Cap/Volume</p>
          <p className="gainers-top-right">Change/Price</p>
        </div>
      <div className="gainers-rows">
        {reversedNewList.map((coin) => {
          return(
            <Gainers
              key={coin.id}
              icon={coin.image}
              symbol={coin.symbol}
              name={coin.name}
              coincap={numFormatter(coin.market_cap)}
              volume={numFormatter(coin.total_volume)}
              price={numberWithCommas(coin.current_price)}
              priceChange={coin.price_change_percentage_24h}
            /> 
          );
        })} 
      </div>
    </div>
  );
}

export default GainersPage