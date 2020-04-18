import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import './style.css'
import useFetch from '../../services/useFetch'
import devicesImg from '../../assets/undraw_mobile_devices_k1ok.svg'
import avatar from '../../assets/avatar_male.svg'

const Logon = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('')
    const [getResponse] = useFetch()
    const [password, setPassword] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)
    const history = useHistory()

    function handleRedirect() {
        const token = localStorage.getItem('x-token')
        const tokenRefresh = localStorage.getItem('x-token-refresh')
        if (token && tokenRefresh)
            return <Redirect to='/dashboard' />
    }

    const handleLogin = async e => {
        e.preventDefault()
        try {
            setIsSubmiting(true)
            const response = await getResponse('post', '/login', { email, password })
            localStorage.setItem('x-userId', response['userId'])
            setIsSubmiting(false)
            setIsAuthenticated(true)
            history.push('/dashboard')
        } 
        catch (error){
            setIsSubmiting(false)
        }
    }

    return (
        <>
            {handleRedirect()}
            <div className="logon-container">
                <div className='menu-holder'>
                    <div className='menu-text'>
                        <h1>Bem vindo de volta!</h1>
                        <h3>Entre agora e comece a gerenciar seus projetos!</h3>
                    </div>
                    <img className='menu-img' src={devicesImg} alt='login' />
                </div>
                <section className="form">
                    <img className='login-avatar' src={avatar} alt='login' />
                    <form onSubmit={handleLogin}>
                        <h1>Faça seu login</h1>
                        <input placeholder='E-mail' type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input placeholder='Senha' type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Link className='forgot-link' to="/password">
                            Esqueceu a senha?</Link>
                        <button className='button' type="submit" disabled={isSubmiting}>{isSubmiting ? 'Carregando...' : 'Entrar'}</button>
                    </form>
                    <div className='links-holder'>
                        <span>Não tem cadastro? </span>
                        <Link className='link' to="/register">
                            CADASTRAR</Link>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Logon