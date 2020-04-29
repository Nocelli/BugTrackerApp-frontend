import React, { useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FiChevronsLeft as ArrowLeft } from "react-icons/fi";
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import yup from '../../validation/Validate'

import { ReactComponent as Avatar } from '../../assets/newproject.svg'
import useFetch from '../../services/useFetch';

const NewProject = () => {

    const history = useHistory()
    const [getResponse] = useFetch()
    const componentIsMounted = useRef(true)

    const validationSchema = yup.object({
        name: yup.string().required().max(16),
        summary: yup.string().required().min(8).max(144),
        description: yup.string().required().min(8).max(256)
    })

    useEffect(()=>{
        return () => {
            componentIsMounted.current = false
        }
    },[])

    async function handleSubmitting({ name, summary, description }) {
        try {
            const response = await getResponse('post', '/project', { name, summary, description })
            if (response)
                history.push('/dashboard')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='NewProject'>
            <Formik initialValues={{ name: '', summary: '', description: '' }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true)
                    await handleSubmitting(data)
                    if(componentIsMounted.current)
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
                        
                        <Field className='desc' name='description' placeholder='Visão geral do projeto' component='textarea' maxLength = "255" />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="description" />
                        <button type='submit' disabled={isSubmitting}>Criar projeto</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewProject