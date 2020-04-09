import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik } from 'formik';
import './style.css'
import NavBar from '../../components/NavBar/NavBar'
import api from '../../services/api'
import devicesImg from '../../assets/undraw_mobile_devices_k1ok.svg'
import avatar from '../../assets/avatar_male.svg'

const Logon = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmiting,setIsSubmiting] = useState(false)
    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try{
            setIsSubmiting(true)
            const response = await api.post('login', { email , password })

            localStorage.setItem('x-token', response.headers['x-token'])
            localStorage.setItem('x-token-refresh', response.headers['x-token-refresh'])
            setIsSubmiting(false)
            history.push('/dashboard')
        }
        catch(err){
            alert('Falha no login, tente novamente')
            console.log(`Erro: ${err}`)
        }
    }

    return (
        <>
        <NavBar />
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
                        <button className='button' type="submit" disabled={isSubmiting}>Entrar</button>
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