import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import './style.css'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import NotificationRenderer from '../../components/NotificationRenderer/NotificationRenderer'
import yup from '../../validation/Validate'
import { ReactComponent as PasswordSvg } from '../../assets/password.svg'
import { useParams } from 'react-router-dom'
import useFetch from '../../services/useFetch'


const NewPassword = () => {

    const [getResponse,setErrors] = useFetch()
    const [notifications, setNotifications] = useState(null)
    const [hasFinished, setHasFinished] = useState(false)
    const { token } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [notifications])

    async function handleSubmitting({ password , confirmPass }) {
        try {
            if (password !== confirmPass){
                setErrors('Por favor, confirme sua senha antes de prosseguir')
                return
            }
            const response = await getResponse('put', 'password/new', { password, token })
            setNotifications(response.status ? response.status : 'Senha alterada com sucesso!')
            setHasFinished(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    const validationSchema = yup.object({
        password: yup.string().required().min(8).max(16)
    })

    return (
        <>
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