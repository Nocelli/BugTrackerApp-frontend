import React, { useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import './style.css'
import { ReactComponent as Mailsvg } from '../../assets/Mail_sent_qwwx.svg'
import useFetch from '../../services/useFetch'


const ConfirmedEmail = () => {

    const [getResponse] = useCallback(useFetch(),[]) 
    const { token } = useParams()

    const handleSubmitting = useCallback(async (token) => {
        try {
            if (token)
                await getResponse('get', `confirmations/validation/${token}`)
        }
        catch (err) {
            console.log(err)
        }
    },[getResponse]) 

    useEffect(() => {
        handleSubmitting(token)
    }, [token,handleSubmitting])

    return (
        <>
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