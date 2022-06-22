import React from 'react';
import { Link } from 'react-router-dom';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
 
//const circleX = <FontAwesomeIcon icon={ faCircleXmark } />

const MyPicks = ({
    icon, 
    symbol, 
    name,  
    priceChange, 
    price,
    id
}) => {

  return (
    <div>
      <div className="mypicks">
        <Link to={`CoinPage/${id}`} className='link-to-coinpage'>

          <div className="coin">
            <img src={icon} alt='crypto-logo' />
          </div>

          <div className="coin-mid">
            <div className="crypto-row-left">
              <div className="crypto-row-left-inner">
                <p className="coin-ticker">{symbol.toUpperCase()}</p>
              </div>
              <p className="coin-name">{name}</p>
            </div>
            <div className="crypto-row-middle">
              <p className="coin-price">${price}</p>
            </div>
          </div>
        </Link>
          
        <div className='coin-right'>  
          <div className="crypto-row-right"> 

            {priceChange < 0 ? (
              <div className='coin-percent-red-div'>
                {typeof priceChange === 'number' && 
                  <p className='coin-percent-red'>{
                    priceChange.toFixed(2)}%
                  </p>
                }
              </div>
            ) : (
              <div className='coin-percent-green-div'>
                {typeof priceChange === 'number' &&
                  <p className='coin-percent-green'>
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

export default MyPicks