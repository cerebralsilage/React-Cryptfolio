import React, { createContext, useState, useEffect } from 'react';

export const MyPicksContext = createContext();

export const MyPicksContextProvider = props => {

 // console.log(localStorage.getItem('picksList'));
  const [picksList, setPicksList] = useState([])
 //   picksList ?
   //   JSON.parse(localStorage.getItem('picksList'))
  //  : [])  */
  //console.log(picksList)

  const [star, setStar] = useState(localStorage.getItem('star'));
  
  useEffect(() => {
    localStorage.setItem("picksList", JSON.stringify(picksList));
  }, [picksList]);

  useEffect(() => {
    localStorage.setItem('star', star)
  }, [star]);

  const deleteCoin = coin => {
    if (picksList.length === 1) {
      setPicksList([]);
    } else {
      setPicksList(picksList.filter(list => {
        console.log(list)
        console.log(coin)
        return list !== coin;
      }))
    }
    console.log('deleted');
    console.log(picksList)
  } 

  // read how to send keys inbetween components so they are defined
   console.log(picksList)

  const toggleCoin = (coin) => {
    if (picksList.length === 0) {
      setPicksList([...picksList, coin]);
    //  console.log('no picklist')
    } else if (picksList.includes(coin)) {
      deleteCoin(coin);
    } else {
      setPicksList([...picksList, coin]);
      console.log('You added this coin');
    }
  } 


  const toggleStar = (coin) => {
    setStar((curr) => (curr === 'emptyStar' ? 'goldStar' : 'emptyStar'));
  } 

  return (
    <MyPicksContext.Provider value={{ picksList, toggleCoin }}>
      {props.children}
    </MyPicksContext.Provider>
  )
}