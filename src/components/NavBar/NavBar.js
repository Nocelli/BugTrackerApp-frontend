import React, { useState } from 'react'
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'
import NotificationsDropDown from '../../components/NotificationsDropDown/NotificationsDropDown'
import logo from '../../assets/bug.svg'
import './style.css'

const NavBar = ({ setIsAuthenticated, isAuthenticated, notification, setNotification }) => {

    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')
    const [notifications, setNorifications] = useState([])
    const [isNotificationsShowing, setIsNotificationsShowing] = useState(false)
    const history = useHistory()

    function handleLogoff() {
        localStorage.clear()
        setIsAuthenticated(false)
    }

    const handleNotifications = async () => {
        togleNotifications()
        setNotification(0)
        try {
            if (!token || !tokenRefresh)
                return

            const response = await api.get(`/notifications`, { headers: { 'x-token': token, 'x-token-refresh': tokenRefresh } })
            setNorifications(response.data)
            console.log(response.data)

            if (response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
        }
        catch (err) {
            const { response } = err
            console.log(response)

            if (response && response.status === 401) {
                localStorage.clear()
                history.push('/')
            }
        }
    }

    const togleNotifications = () => {
        setIsNotificationsShowing(!isNotificationsShowing)
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
                        <Link to='/dashboard' className='nav-item'>
                            <span>Projetos</span>
                        </Link>
                        <hr className='divider' width="1" size="30" />
                        <div className='nav-notification' onClick={handleNotifications}>
                            <span>Notificações</span>
                            {notification > 0 ?
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
            {isNotificationsShowing ?
                (<NotificationsDropDown notifications={notifications} setShowing={setIsNotificationsShowing} />)
                : null}

        </>
    )
}
export default NavBar