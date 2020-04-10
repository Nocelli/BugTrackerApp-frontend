import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './style.css'
import NavBar from '../../components/NavBar/NavBar'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import * as yup from 'yup'
import api from '../../services/api'


import { ReactComponent as Mailsvg } from '../../assets/Mail_sent_qwwx.svg'


const Confirmation = () => {

    const [errors,setErrors] = useState(null)

    async function handleSubmitting({ email }) {
        try {
            const response = await api.post('confirmations/resendemail', { userEmail: email })
            alert(response.data.status)
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