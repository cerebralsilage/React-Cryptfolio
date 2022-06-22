import React, { useEffect, useState } from 'react';
import { numberWithCommas, numFormatter } from '../../Helpers/NumberFunctions';
import Axios from "axios";
import './Losers.css';

import Losers from './Losers';

function LosersPage() {

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
      //  console.log(response.data);
      })
      .catch(error => console.log(error));
  }, []); 

  const newList = listOfCoins.sort( function(a, b) {
    const aValue = Number(a['price_change_percentage_24h']);
    const bValue = Number(b['price_change_percentage_24h']);
    return aValue - bValue;
  }); 

  return (
    <div>
      {isLoading === true ?
      <p className="loading-data">Loading...</p>
      :
      <div>
        <div className="losers-top">
            <p>Coin</p>
            <p className="losers-top-middle">Cap/Volume</p>
            <p className="losers-top-right">Change/Price</p>
          </div>
        <div className="losers-rows">
          {newList.map((coin) => {
            return(
              <Losers
                key={coin.id}
                id={coin.id}
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
      }
    </div>
  );
}

export default LosersPage