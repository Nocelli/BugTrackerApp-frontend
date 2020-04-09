import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik } from 'formik';
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
            setErrors(response.data.message || response.data.error)
        }
    }

    return (
        <>
            <NavBar />
            <ErrorRenderer errors={errors} />
            <div className="logon-container">
                <img className='menu-img' src={devicesImg} alt='login' />
                <section className="form">
                    <img className='login-avatar' src={avatar} alt='login' />
                    <Formik>

                    </Formik>
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