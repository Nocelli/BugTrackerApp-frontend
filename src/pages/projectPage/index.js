import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './style.css'
import { FiChevronsLeft as ArrowLeft, FiPlusCircle as Plus } from "react-icons/fi";
import NavBar from '../../components/NavBarLogged/NavBarLogged'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'
import ProjectTicket from '../../components/ProjectTicket/ProjectTicket'
import { Link, useHistory, useParams } from 'react-router-dom'

const ProjectPage = () => {

    const [project, setProject] = useState({})
    const [members, setMembers] = useState([])
    const [tickets, setTickets] = useState([])
    const [errors, setErrors] = useState(null)
    const history = useHistory()
    const { projectId } = useParams()
    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')

    const handleLoadProject = async () => {
        try {
            if (!token || !tokenRefresh)
                return

            const response = await api.get(`/profile/project/${projectId}`, { headers: { 'x-token': token, 'x-token-refresh': tokenRefresh } })
            setProject(response.data.project)
            setTickets(response.data.tickets)
            setMembers(response.data.members)

            if (response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
        }
        catch (err) {
            const { response } = err
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')

            if (response && response.status === 401) {
                console.log(response)
                localStorage.clear()
                history.push('/')
            }
        }
    }

    useEffect(() => {
        handleLoadProject()
    }, [])

    return (
        <>
            <NavBar />
            <ErrorRenderer errors={errors}/>
            <div className='project-page'>
                <div className='back-button'>
                    <ArrowLeft />
                    <Link className='back-button-text' to="/dashboard">
                        Voltar</Link>
                </div>
                <div className='project-holder'>
                    <h1>Título: {project.project_name}</h1>
                    <h2>Sumário:</h2>
                    <h3>{project.project_summary}</h3>
                    <h4>Descrição: </h4>
                    <h5>{project.project_description}</h5>
                    <div className='project-items-container'>
                        <div className='project-tickets'>
                            <h6>Problemas</h6>
                            <a className='button-new' href='/project/a47ad11a/ticket/new'>
                                <span className='button-new-text'>NOVO <Plus className='icon-plus'/></span>
                            </a>
                            {tickets.map((ticket, index) => (
                                <ProjectTicket key={index} ticket={ticket} />
                            ))}
                        </div>
                        <div className='project-members'>
                            <h6>Membros</h6>
                            <div className='button-new'>
                                <Link className='button-new-text' to=''>CONVIDAR <Plus className='icon-plus'/></Link>
                            </div>
                            <pre>{JSON.stringify(members, null, 2)}</pre>
                            {members.map((member , index) => (
                                <span key={index}>{member.member_name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProjectPage