import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import Logo from './assets/pics/cryptoicon.png';

import CoinCapPage from './components/CoinCap/CoinCapPage';
import GainersPage from './components/Gainers/GainersPage';
import LosersPage from './components/Losers/LosersPage';
import MyPicksPage from './components/MyPicks/MyPicksPage';
import VolumePage from './components/Volume/VolumePage';
import Alerts from './components/Alerts/Alerts';
import SearchPage from './components/Search/SearchPage';
import CoinPage from './components/CoinPage/CoinPage';
import { MyPicksContextProvider } from './Helpers/MyPicksContext';


const magnifyingGlass = <FontAwesomeIcon icon={ faMagnifyingGlass } />
const bell = <FontAwesomeIcon icon={ faBell } /> 
const moon = <FontAwesomeIcon icon={ faMoon } />
const sun = <FontAwesomeIcon icon={ faSun } />

const ThemeContext = createContext(null);


const App = props => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      <MyPicksContextProvider>
        <div className="App" id={theme}>
          <Router>
            <Container className="p-0" fluid="true"> 

              <Navbar className ="navbar">
                <Navbar.Brand className="navbar-brand"> 
                  <img className="logo" src={ Logo } alt='logo' />
                  <h1 className='header-name'>Cryptfolio</h1> 

                  { theme === 'light' ?
                    <div className='buttons-top'>
                      <button className="toggle-button" onClick={toggleTheme}> 
                        {moon}
                      </button>
                      <Link className="nav-link" id='bell' to='/Alerts'>
                      { bell }
                      </Link>
                      <Link className="nav-link" id='magGlass' to='/Search'>
                      { magnifyingGlass }
                      </Link>
                    </div>
                    :
                    <div className='buttons-top'>
                      <button className="toggle-button" id='sun' onClick={toggleTheme}> 
                        {sun}
                      </button>
                      <Link className="nav-link" id='bell-dark' to='/Alerts'>
                        { bell }
                      </Link>
                      <Link className="nav-link" id='magGlass-dark' to='/Search'>
                        { magnifyingGlass }
                      </Link>
                    </div>
                  }
                </Navbar.Brand>

                {theme === 'light' ?
                  <Nav className="nav-list">
                    <NavLink  
                      className={({ isActive }) => 
                      (isActive ? "active-page"
                      : "nav-link")}
                      to='/'>Picks
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link")}
                      to='/CoinCap'>CoinCap
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link")} 
                      to='/Gainers'>Gainers
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link")}
                      to='/Losers'>Losers
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link")}
                      to='/Volume'>Volume
                    </NavLink>
                  </Nav>
                : 
                  <Nav>
                    <NavLink  
                      className={({ isActive }) => 
                      (isActive ? "active-page"
                      : "nav-link-dark")}
                      to='/'>Picks
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link-dark")}
                      to='/CoinCap'>CoinCap
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link-dark")} 
                      to='/Gainers'>Gainers
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link-dark")}
                      to='/Losers'>Losers
                    </NavLink>
                    <NavLink 
                      className={({ isActive }) => 
                        (isActive ? "active-page"
                        : "nav-link-dark")}
                      to='/Volume'>Volume
                    </NavLink>
                  </Nav>
                }
              </Navbar>  

              <Routes>
                <Route path='/' element={ <MyPicksPage /> } />
                <Route path='/CoinCap' key='picks' element={ <CoinCapPage /> } />
                <Route path='/Gainers' key='gainers' element={ <GainersPage /> } />
                <Route path='/Losers' key='losers' element={ <LosersPage /> } />
                <Route path='/Volume' key='volume' element={ <VolumePage /> } />
                <Route path='/Alerts' key='alerts' element={ <Alerts /> } />
                <Route path='/Search' key='search' element={ <SearchPage /> } />
                <Route path='/CoinPage/:id' key='token' element={ <CoinPage /> } />
                <Route path='Losers/CoinPage/:id' key='token' element={ <CoinPage /> } />
                <Route path='CoinCap/CoinPage/:id' key='token' element={ <CoinPage /> } />
                <Route path='Gainers/CoinPage/:id' key='token' element={ <CoinPage /> } />
                <Route path='Volume/CoinPage/:id' key='token' element={ <CoinPage /> } />
              </Routes>

            </Container>
          </Router>
        </div>
      </MyPicksContextProvider>
    </ThemeContext.Provider>
  );
}

export default App;
