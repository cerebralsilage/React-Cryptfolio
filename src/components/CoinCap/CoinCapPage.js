import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { numberWithCommas, numFormatter } from '../../Helpers/NumberFunctions';
import './CoinCap.css';

import CoinCapRows from './CoinCapRows';
import CoinCapTop from './CoinCapTop';

function CoinCapPage() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [totalMarketData, setTotalMarketData] = useState([]);
  const [oneDayData, setOneDayData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
      Axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then(setIsLoading(true)
      )
      .then(response => {
        setListOfCoins(response.data);
        setIsLoading(false);
          //console.log(response.data)
        })
        .catch(error => console.log(error));
  }, []);
  //console.log(listOfCoins)

  useEffect(() => {
      Axios.get("https://api.coingecko.com/api/v3/global"
      )
      .then(response => {
          setTotalMarketData(response.data.data.total_market_cap.usd);
          setOneDayData(response.data.data.market_cap_change_percentage_24h_usd.toFixed(2));
          // console.log(response.data.data.total_market_cap.usd)
        })
        .catch(error => console.log(error));
  }, []); 

  function getOccu(num) {
    return (num / totalMarketData) * 100;
  }

  return (
    <div>
      {isLoading === true ?
        <p className='loading-data'>Loading...</p>
      :
        <div>
          <CoinCapTop 
            totalCap={numFormatter(totalMarketData)}
            oneDay={oneDayData}
          /> 
          {listOfCoins.map((coin) => {
            return (
              <CoinCapRows 
                key={coin.id}
                id={coin.id}
                rank={coin.market_cap_rank}
                name={coin.name} 
                icon={coin.image} 
                price={numberWithCommas(coin.current_price)}
                symbol={coin.symbol} 
                occu={getOccu(coin.market_cap)}
                coincap ={numFormatter(coin.market_cap)}
                marketCap24Change={coin.market_cap_change_percentage_24h}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })}
        </div>
      }
    </div>
  )
}

export default CoinCapPage