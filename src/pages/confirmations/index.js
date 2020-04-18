import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './style.css'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import NotificationRenderer from '../../components/NotificationRenderer/NotificationRenderer'
import yup from '../../validation/Validate'


import { ReactComponent as Mailsvg } from '../../assets/Mail_sent_qwwx.svg'
import useFetch from '../../services/useFetch'


const Confirmation = () => {

    const [getResponse] = useFetch()
    const [notifications, setNotifications] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [notifications])

    async function handleSubmitting({ email }) {
        try {
            const response = await getResponse('post', 'confirmations/resendemail', { userEmail: email })
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
                            <Mailsvg className='img-email' />
                            <h1>Quase lá!</h1>
                            <h2>Confirme seu endereço de e-mail</h2>
                            <h3>Para usar sua conta, confirme o endereço de e-mail acessando o link que foi enviado no seu email.</h3>
                            <h3>Não recebeu um email?</h3>
                            <Field name='email' placeholder='E-mail' type='email' />
                            <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="email" />
                            <button type='submit' disabled={isSubmitting}>Re-enviar email</button>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    )
}

export default Confirmation