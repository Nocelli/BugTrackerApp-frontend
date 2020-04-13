import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './style.css'
import NavBar from '../../components/NavBar/NavBar'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import NotificationRenderer from '../../components/NotificationRenderer/NotificationRenderer'
import yup from '../../validation/Validate'
import api from '../../services/api'


import { ReactComponent as PasswordSvg } from '../../assets/password.svg'
import { useParams } from 'react-router-dom'


const NewPassword = () => {

    const [errors, setErrors] = useState(null)
    const [notifications, setNotifications] = useState(null)
    const [hasFinished, setHasFinished] = useState(false)
    const { token } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [errors, notifications])

    async function handleSubmitting({ password , confirmPass }) {
        try {
            setErrors(null)
            if (password !== confirmPass){
                setErrors('Por favor, confirme sua senha antes de prosseguir')
                return
            }

            const response = await api.put('password/new',
                { password },
                { headers: { 'x-token': token } })
            setNotifications(response.data.status ? response.data.status : 'Senha alterada com sucesso!')
            setHasFinished(true)
        }
        catch (err) {
            const { response } = err;
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')
            console.log(err)
        }
    }

    const validationSchema = yup.object({
        password: yup.string().required().min(8).max(16)
    })

    return (
        <>
            <NavBar />
            <ErrorRenderer errors={errors} />
            <NotificationRenderer notifications={notifications} />
            <Formik initialValues={{ password: '' ,confirmPass: ''}}
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
                            <h1>Digite sua nova senha</h1>
                            <Field name='password' placeholder='Senha' type='password' />
                            <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="password" />
                            <Field name='confirmPass' placeholder='Confirme a Senha' type='password' />
                            <button className={hasFinished ? 'disabled' : null} type='submit' disabled={isSubmitting}>Redefinir senha</button>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    )
}

export default NewPassword