import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyPicksContext } from '../../Helpers/MyPicksContext';
import { numberWithCommas } from '../../Helpers/NumberFunctions';
import './MyPicks.css';

import MyPicks from './MyPicks';


const MyPicksPage = props => {
  
  const { picksList } = useContext(MyPicksContext);
  //console.log(picksList)
  const navigate = useNavigate();

  return (
    <div className="picks">
      <h1 className='picks-title'>My Watch List</h1>
      <div>
        {picksList.length === 0 ?
          <div className="no-data-menu">
            <p>Add some tokens to start watching</p>
            <button className='search-button' onClick={()=>navigate('/Search')}>Search</button>
          </div>
        :
          <div className='picks-list'>
            <div className='phead'>
              <p className='phead-left'>Coin</p>
              <p className='phead-mid'>Price/USD</p>
              <p className='phead-right'>24H Change</p>
            </div>
            {picksList.map((coin) => {
              return (
                <MyPicks
                  key={coin.id}
                  id={coin.id}
                  name={coin.name}
                  price={numberWithCommas(coin.current_price)}
                  symbol={coin.symbol}
                  priceChange={coin.price_change_percentage_24h}
                  icon={coin.image}
                  data={coin}
                />
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default MyPicksPage

