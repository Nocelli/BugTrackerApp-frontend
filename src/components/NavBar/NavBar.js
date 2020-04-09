import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/bug.svg'

import './style.css'

const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <a href='/' className='logo' >
                    <img className='logo-img' src={logo} alt='logo' />
                    <span className='logo-name' >Bug Hero</span>
                </a>
                <Link className='nav-link' to="/login">
                    ENTRAR</Link>
                    <hr className='divider' width="1" size="30"/>
                <Link className='nav-link' to="/register">
                    CADASTRE-SE</Link>
            </nav>
        </>
    )
}
export default NavBar