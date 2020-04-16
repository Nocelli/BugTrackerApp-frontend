import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import './style.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FiChevronsLeft as ArrowLeft } from "react-icons/fi";
import api from '../../services/api'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import yup from '../../validation/Validate'

import { ReactComponent as Avatar } from '../../assets/newIssue.svg'

const NewTicket = () => {

    const statuses = ["Aberto","Em andamento","Para ser testado","Fechado"]
	const severitys = ["Nenhum", "Crítico", "Grave", "Não-urgente"]
	const types = ["Subtarefa", "Bug", "Aperfeiçoamento", "Novo recurso", "Tarefa"]

    const { projectId } = useParams()
    const [errors, setErrors] = useState(null)
    const history = useHistory()
    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')

    useEffect(() => {
        document.body.scrollTo(0, 0)
    }, [errors])

    const validationSchema = yup.object({
        name: yup.string().required().max(30),
        summary: yup.string().required().min(8).max(144),
        description: yup.string().required().min(8).max(256),
        status: yup.string().required().oneOf(statuses),
	    severity: yup.string().required().oneOf(severitys),
	    type: yup.string().required().oneOf(types),
    })

    async function handleSubmitting({ name, summary, description, status, severity, type }) {
        try {
            setErrors(null)
            const response = await api.post(`/tickets/${projectId}/`, { name, summary, description, status, severity, type },{ headers: { 'x-token': token, 'x-token-refresh': tokenRefresh }})
            if(response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
            if (response)
                history.push(`/project/${projectId}`)
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
        <div className='NewTicket'>
            <ErrorRenderer errors={errors} />
            <Formik initialValues={{ name: '', summary: '', description: '' ,status: '', severity: '',type:''}}
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
                            <Link className='back-button-text' to={`/project/${projectId}`}>
                                Voltar</Link>
                        </div>
                        <Avatar className='NewTicket-svg' />
                        <h1>Novo Relato</h1>
                        <h3>Preencha os campos abaixo</h3>
                        <Field name='name' placeholder='Nome' type='input' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="name"/>

                        <Field className='summary' name='summary' placeholder='Sumário' component='textarea' maxLength = "100" />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="summary" />
                        
                        <Field className='desc' name='description' placeholder='Descrição' component='textarea' maxLength = "300" />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="description" />

                        <Field className='dropdown' name='status' component='select'>
                            <option value="" label="Escolha um status" />
                            {statuses.map((status , index) => (
                                <option key={index} value={status} label={status} />
                            ))}
                        </Field>
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="status" />

                        <Field className='dropdown' name='severity' component='select'>
                            <option value="" label="Escolha a severidade" />
                            {severitys.map((severity, index) => (
                                <option key={index} value={severity} label={severity} />
                            ))}
                        </Field>
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="severity" />

                        <Field className='dropdown' name='type' component='select'>
                            <option value="" label="Escolha o tipo" />
                            {types.map((type, index) => (
                                <option key={index} value={type} label={type} />
                            ))}
                        </Field>
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="type" />

                        <button type='submit' disabled={isSubmitting}>Criar Relatório</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewTicket