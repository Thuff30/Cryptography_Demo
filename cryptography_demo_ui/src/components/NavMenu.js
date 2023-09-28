import React, { Component } from 'react';
//import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import './NavMenu.css';

export const NavMenu = (props) => {

    return (
        <Navbar>
            <ul>
                <li>
                    <NavLink to="./pages/CaesarShift" class="nav-item">Caesar Shift</NavLink>
                </li>
                <li>
                    <NavLink to="./pages/Vigeneres" class="nav-item">Vigenere's Cipher</NavLink>
                </li>
                <li>
                    <NavLink to="./pages/Enigma" class="nav-item">Enigma</NavLink>
                </li>
            </ul>
        </Navbar>
    );
}

export default NavMenu;
