import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import './style.css'
import NavBar from '../../components/NavBar/NavBar'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import api from '../../services/api'
import devicesImg from '../../assets/undraw_mobile_devices_k1ok.svg'
import avatar from '../../assets/avatar_male.svg'

const Logon = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState(null)
    const [password, setPassword] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)
    const history = useHistory()

    function handleRedirect() {
        const token = localStorage.getItem('x-token')
        const tokenRefresh = localStorage.getItem('x-token-refresh')
        if (token && tokenRefresh)
            return <Redirect to='/dashboard' />
    }
    async function handleLogin(e) {
        e.preventDefault()

        try {
            setErrors(null)
            setIsSubmiting(true)
            const response = await api.post('login', { email, password })

            localStorage.setItem('x-token', response.headers['x-token'])
            localStorage.setItem('x-token-refresh', response.headers['x-token-refresh'])
            setIsSubmiting(false)
            history.push('/dashboard')
        }
        catch (error) {
            setIsSubmiting(false)
            const { response } = error;
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')
        }
    }

    return (
        <>
            {handleRedirect()}
            <NavBar />
            <ErrorRenderer errors={errors} />
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
                        <Link className='forgot-link' to="/forgotpass">
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