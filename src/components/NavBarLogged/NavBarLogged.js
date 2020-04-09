import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/bug.svg'

import './style.css'

const NavBarLogged = () => {

    function handleLogoff(){
        localStorage.clear()
    }

    return (
        <>
            <nav className="navbar">
                <a href='/dashboard' className='logo' >
                    <img className='logo-img' src={logo} alt='logo' />
                    <span className='logo-name' >Bug Hero</span>
                </a>
                <Link className='nav-link' to="/" onClick={() => (handleLogoff())}>
                    SAIR</Link>
            </nav>
        </>
    )
}
export default NavBarLogged