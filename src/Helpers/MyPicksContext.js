import React, { createContext, useState, useEffect } from 'react';
export const MyPicksContext = createContext();

export const MyPicksContextProvider = props => {
 // console.log(localStorage.getItem('picksList'));
  const [picksList, setPicksList] = useState(
      JSON.parse(localStorage.getItem('picksList'))
    || 
      []
  )
  
  //console.log(picksList)

   useEffect(() => {
    localStorage.setItem("picksList", JSON.stringify(picksList));
  }, [picksList]);

  const deleteCoin = coin => {
    if (picksList.length === 1) {
      setPicksList([]);
    } else {
      setPicksList(picksList.filter(list => {
        console.log(list)
        //console.log(coin)
        return list !== coin;
      }))
    }
    console.log('deleted');
    console.log(picksList)
  }  

  const toggleCoin = (coin) => {
    if (picksList.length === 0) {
      setPicksList([...picksList, coin]);
    } else {
      if (picksList.indexOf(coin) === -1 ) {
        setPicksList([...picksList, coin]);
        console.log('added 1')
      } else {
        deleteCoin(coin)
      }
    }
  } 

  console.log(picksList)

  return (
    <MyPicksContext.Provider value={{ picksList, toggleCoin }}>
      {props.children}
    </MyPicksContext.Provider>
  )
}