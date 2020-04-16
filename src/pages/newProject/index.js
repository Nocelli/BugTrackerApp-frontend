import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FiChevronsLeft as ArrowLeft } from "react-icons/fi";
import api from '../../services/api'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import yup from '../../validation/Validate'

import { ReactComponent as Avatar } from '../../assets/newproject.svg'

const NewProject = () => {

    const [errors, setErrors] = useState(null)
    const history = useHistory()
    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')

    useEffect(() => {
        document.body.scrollTo(0, 0)
    }, [errors])

    const validationSchema = yup.object({
        name: yup.string().required().max(50),
        summary: yup.string().required().min(8).max(144),
        description: yup.string().required().min(8).max(256)
    })

    async function handleSubmitting({ name, summary, description }) {
        try {
            setErrors(null)
            const response = await api.post('/project', { name, summary, description },{ headers: { 'x-token': token, 'x-token-refresh': tokenRefresh }})
            if(response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
            if (response)
                history.push('/dashboard')
        }
        catch (err) {
            const { response } = err;
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')
        
            if(response && response.status === 401){
                console.log(response)
                localStorage.clear()
                history.push('/')
            }
        }
    }

    return (
        <div className='NewProject'>
            <ErrorRenderer errors={errors} />
            <Formik initialValues={{ name: '', summary: '', description: '' }}
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
                        <Avatar className='newproject-svg' />
                        <h1>Novo Projeto</h1>
                        <h3>Preencha os campos abaixo</h3>
                        <Field name='name' placeholder='Nome' type='input' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="name"/>

                        <Field className='summary' name='summary' placeholder='Sumário' component='textarea' maxLength = "144" />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="summary" />
                        
                        <Field className='desc' name='description' placeholder='Visão geral do projeto' component='textarea' maxLength = "400" />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="description" />
                        <button type='submit' disabled={isSubmitting}>Criar projeto</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewProject