import React from 'react';
import './CoinCap.css';

const CoinCapRows = ({
  symbol,
  name,
  coincap,
  occu,
  price, 
  priceChange,
  icon,
  rank
})  => {

    return (
      <div className="coincapage-coin-cap-rows">
        <div className="coincapage-coin-row">
          {rank}
          <div className="coin">
            <img src={icon} alt='crypto-logo' />
          </div>
          <div className="coincapage-coin-right">
            <div className="coincapage-crypto-row-left">
              <p className="coincapage-coin-ticker">{symbol.toUpperCase()}</p>
              <p className="coincapage-coin-name">{name}</p>
            </div>
            <div className="coincapage-crypto-row-middle">
              <p className="coincapage-coin-cap">{coincap}</p>
              <p className="coincapage-coin-occu">{occu.toFixed(2)}%</p>
            </div>
            <div className="coincapage-crypto-row-right"> 
              {priceChange < 0 ? (
              <div>
                <p className="coincapage-coin-price-red">{price}</p>
                {typeof priceChange === 'number' && 
                  <p className='coincapage-coin-percent-red'>
                    {priceChange.toFixed(2)}%
                  </p>
                }
              </div>
            ) : (
              <div>
                <p className="coincapage-coin-price-green">{price}</p>
                {typeof priceChange === 'number' && 
                  <p className='coincapage-coin-percent-green'>
                    +{priceChange.toFixed(2)}%
                  </p>
                }
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    )
}

export default CoinCapRows