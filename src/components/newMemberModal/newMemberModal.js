import React from 'react'
import './style.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FiChevronsLeft as ArrowLeft } from "react-icons/fi";
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import yup from '../../validation/Validate'

import { ReactComponent as Avatar } from '../../assets/selecting_team.svg'
import useFetch from '../../services/useFetch';

const NewMemberModal = ({ openModal, projectId, setOpenModal }) => {

    const [getResponse] = useFetch()
    const validationSchema = yup.object({
        email: yup.string().required().email(),
        role: yup.number().required()
    })

    async function handleSubmitting({ email, role }) {
        try {
            const response = await getResponse('post', `/invite/${projectId}`, { userEmail: email, roleId: role })
            if (response)
                setOpenModal(false)
        }
        catch (err) {
            console.log(err)
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