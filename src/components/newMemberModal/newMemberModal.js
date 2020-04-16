import React from 'react'
import './style.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FiChevronsLeft as ArrowLeft } from "react-icons/fi";
import api from '../../services/api'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import yup from '../../validation/Validate'

import { ReactComponent as Avatar } from '../../assets/selecting_team.svg'

const NewMemberModal = ({ openModal, projectId, setErrors, setOpenModal }) => {

    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')

    const validationSchema = yup.object({
        email: yup.string().required().email(),
        role: yup.number().required()
    })

    async function handleSubmitting({ email, role }) {
        try {
            setErrors(null)
            const response = await api.post(`/invite/${projectId}`, { userEmail: email, roleId: role }, { headers: { 'x-token': token, 'x-token-refresh': tokenRefresh } })
            if (response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
            if (response)
                setOpenModal(false)
        }
        catch (err) {
            const { response } = err;
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')

            if (response && response.status === 401) {
                localStorage.clear()
            }
            setOpenModal(false)
        }
    }

    return (
        <div className={openModal ? 'modal' : 'hidden'}>
            <Formik initialValues={{ email: '', role: '' }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true)
                    await handleSubmitting(data)
                    setSubmitting(false)
                }}
                validationSchema={validationSchema}>
                {({ isSubmitting }) => (
                    <Form className='modal-form'>
                        <div className='back-button' onClick={() => setOpenModal(false)}>
                            <ArrowLeft />
                            <span className='back-button-text'>
                                Voltar</span>
                        </div>
                        <Avatar className='modalSvg-svg' />
                        <h1>Novo membro</h1>
                        <h3>Digite o email do usuário abaixo para enviar um convite</h3>
                        <Field name='email' placeholder='E-mail' type='email' />
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="email" />
                        <Field className='dropdown' name='role' component='select'>
                            <option value="" label="Escolha o cargo" />
                            <option value={2} label={'Administrador'} />
                            <option value={3} label={'Desenvolvedor'} />
                        </Field>
                        <ErrorMessage render={msg => <ErrorRenderer errors={msg} />} name="role" />
                        <button type='submit' disabled={isSubmitting}>Enviar convite</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewMemberModal