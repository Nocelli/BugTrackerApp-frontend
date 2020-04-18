import React, { useEffect, useState } from 'react'
import './style.css'
import { FiChevronsLeft as ArrowLeft, FiPlusCircle as Plus } from "react-icons/fi";
import ProjectTicket from '../../components/ProjectTicket/ProjectTicket'
import ProjecMember from '../../components/ProjectMember/ProjectMember'
import NewMemberModal from '../../components/newMemberModal/newMemberModal'
import useFetch from '../../services/useFetch'
import { Link, useParams } from 'react-router-dom'

const ProjectPage = () => {

    const [openModal,setOpenModal] = useState(false)
    const [project, setProject] = useState({})
    const [members, setMembers] = useState([])
    const [tickets, setTickets] = useState([])
    const [getResponse] = useFetch()
    const { projectId } = useParams()

    const handleLoadProject = async () => {
        try {
            const response = await getResponse('get', `/profile/project/${projectId}`)
            setProject(response.project)
            setTickets(response.tickets)
            setMembers(response.members)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleLoadProject()
    }, [])

    return (
        <>  
            <NewMemberModal openModal={openModal} projectId={projectId} setOpenModal={setOpenModal}/>
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
                            <Link className='button-new' to={`/project/${projectId}/ticket/new`}>
                                <span className='button-new-text'>NOVO <Plus className='icon-plus'/></span>
                            </Link>
                            {tickets.map((ticket, index) => (
                                <ProjectTicket key={index} ticket={ticket} />
                            ))}
                        </div>
                        <div className='project-members'>
                            <h6>Membros</h6>
                            <div className='button-new' onClick={() => {setOpenModal(true)} }>
                                <span className='button-new-text'>CONVIDAR <Plus className='icon-plus'/></span>
                            </div>
                            {members.map((member , index) => (
                                <ProjecMember key={index} member={member} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProjectPage