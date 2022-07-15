import React, { createContext, useState, useEffect } from 'react';
export const MyPicksContext = createContext();

export const DarkModeContextProvider = props => {
  // console.log(localStorage.getItem('picksList'));
   const [theme, setTheme] = useState(
     JSON.parse(localStorage.getItem('mode'))
     || 
       []
   )
 
    useEffect(() => {
     localStorage.setItem("mode", JSON.stringify(theme));
   }, [theme]); 

  }