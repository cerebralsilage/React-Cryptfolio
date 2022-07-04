import React, { createContext, useState, useEffect } from 'react';
export const MyPicksContext = createContext();

export const MyPicksContextProvider = props => {
 // console.log(localStorage.getItem('picksList'));
  const [picksList, setPicksList] = useState(
    JSON.parse(localStorage.getItem('picksList'))
    || 
      []
  )

   useEffect(() => {
    localStorage.setItem("picksList", JSON.stringify(picksList));
  }, [picksList]);  

  const deleteCoin = coin => {
    if (picksList.length === 1) {
      setPicksList([]);
    } else {
      let coinToDelete = picksList.find(ele => ele === coin.id)
      setPicksList(picksList.filter(ele => {
        return ele !== coinToDelete;
      }))    
    } 
    console.log('deleted 1') 
  }

  const toggleCoin = (coin) => {
    if (picksList.length === 0) {
      setPicksList([...picksList, coin.id]);
      console.log(picksList)
    } else {
      if (picksList.find(item => item === coin.id)) {
        deleteCoin(coin)
      } else {
        setPicksList([...picksList, coin.id])
        console.log('added 1')
      }
    }
  }

  const colorStar = (coin) => {
    if (picksList.find(item => item === coin.id)) {
      return 'goldStar'
    } else {
      return 'emptyStar'
    }
  }

  return (
    <MyPicksContext.Provider value={{ picksList, toggleCoin, colorStar }}>
      {props.children}
    </MyPicksContext.Provider>
  )
}