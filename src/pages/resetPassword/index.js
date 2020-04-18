import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './style.css'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import NotificationRenderer from '../../components/NotificationRenderer/NotificationRenderer'
import yup from '../../validation/Validate'
import useFetch from '../../services/useFetch'


import { ReactComponent as PasswordSvg } from '../../assets/password.svg'


const ResetPassword = () => {

    const [getResponse] = useFetch()
    const [notifications,setNotifications] = useState(null)

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[notifications])

    async function handleSubmitting({ email }) {
        try {
            const response = await getResponse('post', '/password/new', { email })
            setNotifications(response.status)
        }
        catch (err) {
            console.log(err)
        }
    }

    const validationSchema = yup.object({
        email: yup.string().email().required()
    })

    return (
        <>
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