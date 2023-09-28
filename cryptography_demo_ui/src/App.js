import logo from './logo.svg';
import './App.css';
import { NavMenu } from './components/NavMenu';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { CaesarShift } from './pages/CaesarShift';
import { Vigeneres } from './pages/Vigeneres';
import { Enigma } from './pages/Enigma';
import Navbar from 'react-bootstrap/Navbar';

export const App = () => {
    return (
        <div className="App">
            <Navbar className="navbar">
                <NavLink to="/pages/CaesarShift" className="nav-item">Caesar Cipher</NavLink>
                <NavLink to="/pages/Vigeneres" className="nav-item">Vigenere Cipher</NavLink>
                <NavLink to="/pages/Enigma" className="nav-item">Enigma</NavLink>
            </Navbar>
            <Routes>
                <Route path="/pages/CaesarShift" element={<CaesarShift />}></Route>
                <Route path="/pages/Vigeneres" element={<Vigeneres />}></Route>
                <Route path="/pages/Enigma" element={<Enigma />}></Route>
            </Routes>
        </div>
    );
}


export default App;
