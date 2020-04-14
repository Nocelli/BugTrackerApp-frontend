import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/bug.svg'
import './style.css'

const NavBar = ({ setIsAuthenticated, isAuthenticated, notification }) => {

    function handleLogoff() {
        localStorage.clear()
        setIsAuthenticated(false)
    }

    return (
        <>
            {isAuthenticated ? (
                <nav className="navbar">
                    <Link to='/dashboard' className='logo' >
                        <img className='logo-img' src={logo} alt='logo' />
                        <span className='logo-name' >Bug Hero</span>
                    </Link>
                    <div className='navbar-items'>
                        <div className='nav-notification'>
                            <span>Notificações</span>
                            {notification ?
                                (<span className={'new-notification'}>{notification}</span>)
                                : null}
                        </div>
                        <hr className='divider' width="1" size="30" />
                        <a className='nav-link' href="/" onClick={() => (handleLogoff())}>
                            SAIR</a>
                    </div>
                </nav>) :
                (<nav className="navbar">
                    <Link to='/' className='logo' >
                        <img className='logo-img' src={logo} alt='logo' />
                        <span className='logo-name' >Bug Hero</span>
                    </Link>
                    <div className='navbar-items'>
                        <Link className='nav-link' to="/login">
                            ENTRAR</Link>
                        <hr className='divider' width="1" size="30" />
                        <Link className='nav-link' to="/register">
                            CADASTRE-SE</Link>
                    </div>
                </nav>)}
        </>
    )
}
export default NavBar