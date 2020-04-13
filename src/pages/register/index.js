import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import api from '../../services/api'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import yup from '../../validation/Validate'
import { FiChevronsLeft as ArrowLeft } from "react-icons/fi";

import { ReactComponent as Background } from '../../assets/signup_background.svg'
import { ReactComponent as Avatar } from '../../assets/avatar.svg'

const Register = () => {

    const [errors, setErrors] = useState(null)
    const history = useHistory()

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[errors])

    const validationSchema = yup.object({
        email: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().required().min(8).max(16)
    })

    async function handleSubmitting({ name, email, password, confirmPass }) {
        try {
            setErrors(null)
            if (password !== confirmPass){
                setErrors('Por favor, confirme sua senha antes de prosseguir')
                return
            }
            const response = await api.post('users', { name, email, password })
            if (response)
                history.push('/confirmations')
        }
        catch (err) {
            const { response } = err;
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')
        }
    }

    return (
        <div className='form-container'>
            <Background className='background' />
            <ErrorRenderer errors={errors} />
            <Formik initialValues={{ email: '', name: '', password: '', confirmPass: '' }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true)
                    await handleSubmitting(data)
                    setSubmitting(false)
                }}
                validationSchema={validationSchema}>
                {({ isSubmitting }) => (
                    <Form className='form'>
                        <div className='back-button'>
                            <ArrowLeft />
                            <Link className='back-button-text' to="/dashboard">
                                Voltar</Link>
                        </div>
                        <Avatar className='signup-avatar' />
                        <h1>Cadastre-se</h1>
                        <h3>crie uma conta rápido e fácil</h3>
                        <Field name='name' placeholder='Nome' type='input' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="name" />
                        <Field name='email' placeholder='E-mail' type='email' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="email" />
                        <Field name='password' placeholder='Senha' type='password' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="password" />
                        <Field name='confirmPass' placeholder='Confirme a Senha' type='password' />
                        <button type='submit' disabled={isSubmitting}>Criar conta</button>
                        <div className='links-holder'>
                            <span>Já tem uma conta? </span>
                            <Link className='link' to="/login">
                                Entrar</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register