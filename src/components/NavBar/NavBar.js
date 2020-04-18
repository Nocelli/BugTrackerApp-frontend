import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NotificationsDropDown from '../../components/NotificationsDropDown/NotificationsDropDown'
import logo from '../../assets/bug.svg'
import './style.css'
import useFetch from '../../services/useFetch'

const NavBar = ({ setIsAuthenticated, isAuthenticated, notification, setNotification }) => {

    let location = useLocation()
    const [getResponse,setErrors] = useFetch()
    const [notifications, setNorifications] = useState([])
    const [isNotificationsShowing, setIsNotificationsShowing] = useState(false)

    function handleLogoff() {
        setIsAuthenticated(false)
        localStorage.clear()
    }

    useEffect(() => {
        document.body.scrollTo(0, 0)
        setErrors(null)
    }, [location])

    const handleNotifications = async () => {
        togleNotifications()
        setNotification(0)
        try {
            const response = await getResponse('get', '/notifications')
            setNorifications(response)
        }
        catch (err) {
            console.log(err)
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