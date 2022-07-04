import React, { useContext } from 'react';
import { MyPicksContext } from '../../Helpers/MyPicksContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const star = <FontAwesomeIcon icon={ faStar } />

const Search = ({
  icon,
  symbol,
  name,
  data,
  id
}) => {

  const { toggleCoin, colorStar } = useContext(MyPicksContext);  

  return (
    <div className="search">
      <div className="search-rows">
        <div className="search-row">
          <div className="coin">
            <img src={icon} alt='crypto-logo' />
          </div>
          <div className="coin-right">
            <div className="crypto-row-left">
              <p className="coin-ticker">{symbol.toUpperCase()}</p>
              <p className="coin-name">/{name}</p>
            </div>
            <div className="crypto-row-right"> 
              <div 
                id={colorStar(data)} 
                onClick={(e) => {
                  e.preventDefault()
                  toggleCoin(data)
                }}
              >
                {star}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search