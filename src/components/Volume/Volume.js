import React from 'react';
import { Link } from 'react-router-dom';
import './Volume.css';

const Volume = ({
    icon, 
    symbol, 
    name, 
    coincap, 
    volume,  
    price,
    priceChange,
    id
}) => {

  return (
    <Link to={`CoinPage/${id}`} className='link-to-coinpage'>
      <div className="volume">
        <div className="volume-rows">
          <div className="coin-row">
            <div className="coin">
              <img src={icon} alt='crypto-logo' />
            </div>
            <div className="coin-right">
              <div className="crypto-row-left">
                <p className="coin-ticker">{symbol}</p>
                <p className="coin-name">{name}</p>
              </div>
              <div className="crypto-row-middle">
                <p className="coin-cap">{coincap}</p>
              </div>
              <div className="crypto-row-right"> 
                { priceChange < 0 ? (
                  <div>
                    <p className="coin-volume-red">{volume}</p>
                    <p className="coin-price-red">{price}</p>
                  </div>
                ) : (
                  <div>
                    <p className="coin-volume-green">{volume}</p>
                    <p className="coin-price-green">{price}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Volume