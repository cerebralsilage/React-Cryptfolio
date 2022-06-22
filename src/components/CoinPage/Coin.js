import React from 'react';

const Coin = ({
    icon, 
    symbol, 
    name, 
    coincap, 
    volume, 
    priceChange, 
    price
}) => {

  return (
    <div className="gainers">
      <div className="gainers-rows">
        <div className="coin-row">
          <div className="coin">
            <img src={icon} alt='crypto-logo' />
          </div>
          <div className="coin-right">
            <div className="crypto-row-left">
              <div className="crypto-row-left-inner">
                <p className="coin-ticker">{symbol}</p>
                <p className="coin-ticker-usd">/USD</p>
              </div>
              <p className="coin-name">{name}</p>
            </div>
            <div className="crypto-row-middle">
              <p className="coin-cap">{coincap}</p>
              <p className="coin-volume">{volume}</p>
            </div>
            <div className="crypto-row-right"> 
              {priceChange < 0 ? (
                <div>
                  {typeof priceChange === 'number' && 
                      <p className='coin-percent-red'>{
                        priceChange.toFixed(2)}%
                      </p>
                  }
                  <p className="coin-price-red">{price}</p> 
                </div>
              ) : (
                <div>
                  {typeof priceChange === 'number' &&
                    <p className='coin-percent-green'>
                      +{priceChange.toFixed(2)}%
                    </p>
                  }
                  <p className="coin-price-green">{price}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Coin