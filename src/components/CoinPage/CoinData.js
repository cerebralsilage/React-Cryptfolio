import React, { useContext }from 'react';
import { MyPicksContext } from '../../Helpers/MyPicksContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { HistoryChart } from '../Charts/HistoryChart';

const star = <FontAwesomeIcon icon={ faStar } />

export const CoinData = ({ 
    symbol,  
    atl,
    ath, 
    high,
    low, 
    rank, 
    price,
    priceChange,
    image,
    data
}) => {

  const { toggleCoin, colorStar } = useContext(MyPicksContext); 

  return (
    <div className="coin-page">
      <div className="coin-page-top">
        <div className='cp-rank'>
          <p className="cp-rank-title">Rank</p>
          <p className="cp-rank-num">#{rank}</p>
        </div> 
        <div className="cp-symbol">
          <img className="coin-page-logo" src={image} alt="coin-logo" />
          <p className="coin-page-title">{symbol.toUpperCase()}/USD</p>
        </div>
        <div id={colorStar(data)} 
                onClick={(e) => {
                  e.preventDefault()
                  toggleCoin(data)
                }}>
        {star}
      </div>
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
        <HistoryChart />
      </div> 
    </div>
  )
}
