import React, { useEffect, useState } from 'react';
import Axios from "axios";
import './Volume.css';

import Volume from './Volume';

function VolumePage() {

  const [listOfCoins, setListOfCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    Axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
    .then(setIsLoading(true)
    )
    .then(response => {
        setListOfCoins(response.data);
        setIsLoading(false);
       // console.log(response.data);
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
    const aValue = Number(a['total_volume']);
    const bValue = Number(b['total_volume']);
    return aValue - bValue;
  }); 

  const reversedNewList = newList.reverse();

  return (
    <div>
      {isLoading === true ?
        <p className='loading-data'>Loading...</p>
      :
        <div>
          <div className="volume-top">
              <p>Coin</p>
              <p className="volume-top-middle">Cap</p>
              <p className="volume-top-right">Volume/Price</p>
            </div>
          <div className="volume-rows">
            {reversedNewList.map((coin) => {
              return(
                <Volume
                  key={coin.id}
                  id={coin.id}
                  icon={coin.image}
                  symbol={coin.symbol.toUpperCase()}
                  name={coin.name}
                  coincap={numFormatter(coin.market_cap)}
                  volume={numFormatter(coin.total_volume)}
                  price={numberWithCommas(coin.current_price.toFixed(3))}
                  priceChange={coin.price_change_percentage_24h}
                /> 
              );
            })} 
          </div>
        </div>
      }
    </div>
  );
}

export default VolumePage