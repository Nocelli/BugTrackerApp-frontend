import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './style.css'
import NavBar from '../../components/NavBar/NavBar'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import NotificationRenderer from '../../components/NotificationRenderer/NotificationRenderer'
import yup from '../../validation/Validate'
import api from '../../services/api'


import { ReactComponent as PasswordSvg } from '../../assets/password.svg'


const ResetPassword = () => {

    const [errors,setErrors] = useState(null)
    const [notifications,setNotifications] = useState(null)

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[errors,notifications])

    async function handleSubmitting({ email }) {
        try {
            const response = await api.post('password/new', { email })
            setNotifications(response.data.status)
        }
        catch (err) {
            const { response } = err;
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')
            console.log(err)
        }
    }

    const validationSchema = yup.object({
        email: yup.string().email().required()
    })

    return (
        <>
            <NavBar />
            <ErrorRenderer errors={errors} />
            <NotificationRenderer notifications={notifications} />
            <Formik initialValues={{ email: '' }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true)
                    await handleSubmitting(data)
                    setSubmitting(false)
                }}
                validationSchema={validationSchema}>
                {({ isSubmitting }) => (
                    <div className='confirmations'>
                        <Form className='form'>
                            <PasswordSvg className='img-password' />
                            <h1>Redefinir senha</h1>
                            <h2>Confirme seu endereço de e-mail</h2>
                            <Field name='email' placeholder='E-mail' type='email' />
                            <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="email" />
                            <button type='submit' disabled={isSubmitting}>Enviar redefinição de senha</button>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    )
}

export default ResetPassword