import React, { useState, useEffect } from 'react';
import { numberWithCommas } from '../../Helpers/NumberFunctions';
import coinGecko from '../../Util/coingecko';
import { useParams } from 'react-router-dom';
import './CoinPage.css';

import { CoinData } from './CoinData';


function CoinPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfCoins, setListOfCoins] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: params.id,
        },
      });
      setListOfCoins(response.data);
      setIsLoading(false);
    };
      fetchData();
  }, [params.id]);
//console.log(listOfCoins)
    
  return (
    
    <div>
      {isLoading === true ? 
        <p className="loading-data">Loading...</p>
      :
      <div className='coin-page'>
        {listOfCoins.map(coin => {
          return <CoinData
            image={coin.image}
            price={numberWithCommas(coin.current_price.toFixed(2))}
            high={numberWithCommas(coin.high_24h)}
            low={numberWithCommas(coin.low_24h)}
            ath={numberWithCommas(coin.ath)}
            atl={coin.atl}
            rank={coin.market_cap_rank}
            symbol={coin.symbol}
            priceChange ={coin.price_change_percentage_24h.toFixed(2)}
            key={coin.id}
            data={coin}
          />
        })}
      </div>
      }
    </div>
  )
}

export default CoinPage