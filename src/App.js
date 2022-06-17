import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Logo from './assets/pics/cryptoicon.png';
import './App.css';

import CoinCapPage from './components/CoinCap/CoinCapPage';
import GainersPage from './components/Gainers/GainersPage';
import LosersPage from './components/Losers/LosersPage';
import MyPicksPage from './components/MyPicks/MyPicksPage';
import VolumePage from './components/Volume/VolumePage';
import Search from './components/Search/Search';


const magnifyingGlass = <FontAwesomeIcon icon={ faMagnifyingGlass } />
const bell = <FontAwesomeIcon icon={ faBell } /> 


const App = props => {

  return (
    <div className="App">
      <Router>
        <Container className="p-0" fluid="true"> 

          <Navbar className ="navbar">
            <Navbar.Brand className="navbar-brand"> 
              <img className="logo" src={ Logo } alt='logo' />
              <h1 className='header-name'>Cryptfolio</h1> 
              <Link className="nav-link" id='bell' to='/Alerts'>
                { bell }
              </Link>
              <Link className="nav-link" id='magGlass' to='/Search'>
                { magnifyingGlass }
              </Link>
            </Navbar.Brand>

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
          </Navbar>  

          <Routes>
            <Route path='/' element={ <MyPicksPage /> } />
            <Route path='/CoinCap' key='picks' element={ <CoinCapPage /> } />
            <Route path='/Gainers' key='gainers' element={ <GainersPage /> } />
            <Route path='/Losers' key='losers' element={ <LosersPage /> } />
            <Route path='/Volume' key='volume' element={ <VolumePage /> } />
            <Route path='/Search' key='search' element={ <Search /> } />
          </Routes>
        </Container> 
      </Router>
    </div>
  );
}

export default App;
