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
                <div className='logo' >
                    <img className='logo-img' src={logo} alt='logo' />
                    <span className='logo-name' >Bug Hero</span>
                </div>
                <Link className='nav-link' to="/" onClick={() => (handleLogoff())}>
                    SAIR</Link>
            </nav>
        </>
    )
}
export default NavBarLogged