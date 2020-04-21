import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NotificationsDropDown from '../../components/NotificationsDropDown/NotificationsDropDown'
import { FiLogOut as Logout } from "react-icons/fi";
import logo from '../../assets/bug.svg'
import './style.css'
import useFetch from '../../services/useFetch'
import { AuthContext } from '../../Auth/AuthContext'


const NavBar = ({ newNotification, setNewNotification }) => {

    let location = useLocation()
    const [getResponse, setErrors] = useCallback(useFetch(), [])
    const [notifications, setNorifications] = useState([])
    const { setAuth, isAuth } = useContext(AuthContext)
    const [isNotificationsShowing, setIsNotificationsShowing] = useState(false)

    function handleLogoff() {
        setAuth()
        localStorage.clear()
    }

    useEffect(() => {
        document.body.scrollTo(0, 0)
        setErrors(null)
    }, [location,setErrors])

    const handleNotifications = async () => {
        togleNotifications()
        setNewNotification(0)
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
            {isAuth ? (
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
                            <span className='nav-item'>Notificações</span>
                            {newNotification > 0 ?
                                (<span className={'new-notification'}>{newNotification}</span>)
                                : null}
                        </div>
                        <hr className='divider' width="1" size="30" />
                        <a className='nav-link' href="/" onClick={() => (handleLogoff())}>
                            SAIR <Logout className='nav-logoff-svg'/></a>
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
export default React.memo(NavBar)