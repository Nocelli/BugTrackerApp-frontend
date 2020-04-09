import React from 'react'
import './style.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import NavBar from '../../components/NavBar/NavBar'
import api from '../../services/api'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import * as yup from 'yup'

const Register = () => {

    const validationSchema = yup.object({
        email: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().required().min(8).max(16)
    })

    return (
        <div className='form-container'>
            <NavBar />
            <Formik initialValues={{ email: '',name:'',password:'' }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true)
                    
                        const response = await api.post('users', {name: data.name , email: data.email, password: data.password})
                        console.log(response);
                        
                    
                    setSubmitting(false)
                }}
                validationSchema={validationSchema}>
                {({ values, isSubmitting, handleSubmit, handleChange, handleBlur }) => (
                    <Form className='form'>
                        <Field name='name' placeholder='Nome' type='input' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="name" />
                        <Field name='email' placeholder='E-mail' type='email' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="email" />
                        <Field name='password' placeholder='Senha' type='password' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="password" />
                        <button type='submit' disabled={isSubmitting}>Cadastrar</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register