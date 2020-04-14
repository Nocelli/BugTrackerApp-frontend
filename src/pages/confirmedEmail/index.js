import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './style.css'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import api from '../../services/api'


import { ReactComponent as Mailsvg } from '../../assets/Mail_sent_qwwx.svg'


const ConfirmedEmail = () => {

    const [errors, setErrors] = useState(null)
    const { token } = useParams()

    useEffect(() => {
         handleSubmitting(token)
    }, [token])

    async function handleSubmitting(token) {
        try {
            if(token)
                await api.get(`confirmations/validation/${token}`) 
        }
        catch (err) {
            const { response } = err;
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')
            console.log(err)
        }
    }

    return (
        <>
            <ErrorRenderer errors={errors} />
            <div className='confirmations'>
                <div className='form'>
                    <Mailsvg className='img-email' />
                    <h1>Email confirmado!</h1>
                    <h2>Conta criada com sucesso</h2>
                    <h3>Para usar sua conta faça o login.</h3>
                    <Link className='login-link' to="/login">Entrar</Link>
                </div>
            </div>
        </>
    )
}

export default ConfirmedEmail