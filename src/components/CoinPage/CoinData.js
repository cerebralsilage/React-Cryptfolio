import React from 'react';

import { CandleStickChart } from './Charts/CandleStickChart';


const CoinData = ({ 
    symbol,  
    atl,
    ath, 
    high,
    low, 
    rank, 
    price,
    priceChange,
    image
}) => {

  return (
    <div className="coin-page">
      <div className="coin-page-top">
        <img className="coin-page-logo" src={image} alt="coin-logo" />
        <p className="coin-page-title">{symbol.toUpperCase()}/USD</p>
      </div>
      <div className="coin-page-lower-top">
        <div className="cplt-left">
          {priceChange < 0 ?
            <div>
              <p className="cplt-lt-red">{price}</p>
              <p className="cplt-lb-red">{priceChange}%</p>
            </div>
          :
            <div>
              <p className="cplt-lt-green">{price}</p>
              <p className="cplt-lb-green">{priceChange}%</p>
            </div>
          }
        </div>
        <div className="cplt-right">
          <div className="cplt-r-mid">
            <p className="cplt-rm-top">24h High</p>
            <p className="cplt-rm-top-num">{high}</p>
            <p className="cplt-rm-bot">24h Low</p>
            <p className="cplt-rm-bot-num">{low}</p>
          </div>
          <div className="cplt-r-right">
            <p className="cplt-rr-top">ATH</p>
            <p className="cplt-rr-top-num">{ath}</p>
            <p className="cplt-rr-bot">ATL</p>
            <p className="cplt-rr-bot-num">{atl}</p>
          </div>
        </div>
      </div>
      <div>
        <CandleStickChart />
      </div>
   {/*   <div className='cp-rank'>
        <p className="cp-rank-title">Rank</p>
        <p className="cp-rank-num">#{rank}</p>
        </div>  */}
    </div>
  )
}

export default CoinData