import React, { useEffect, useState, useCallback } from 'react'
import useFetch from '../../services/useFetch'
import DashboardItem from '../../components/DashboardItem/DashboardItem'

import './style.css'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const [getResponse] = useCallback(useFetch(),[]) 
    const [isSubmitting, setIsSubmitting] = useState(false)

    const history = useHistory()

    const handleRedirect = () => {
        history.push('/project/new')
    }

    const handleLoadProjects = useCallback(async () => {
        setIsSubmitting(true)
        try {
            const response = await getResponse('get', '/profile')
            setProjects(response)
            setIsSubmitting(false)
        }
        catch (error) {
            setIsSubmitting(false)
        }
    },[getResponse]) 

    useEffect(() => {
        handleLoadProjects()
    }, [handleLoadProjects])

    return (
        <div className='dashboard-container'>
            <div className='dashboard'>
                <h1 className='dashboard-title'>Todos os projetos</h1>
                <h2 className='dashboard-subtitle'>Clique em 'mais' para ver mais opções.</h2>
                <div className="buttons">
                    <button className={isSubmitting ? 'disabled' : null} onClick={handleLoadProjects} disabled={isSubmitting}>{isSubmitting ? `Atualizando...` : `Atualizar`}</button>
                    <button onClick={handleRedirect}>Novo</button>
                </div>
                <div className='projects-container'>
                    {!projects[0] ? <h1 className='no-projects'>Nada ainda...Crie um projeto para começar!</h1> :
                     projects.map(project => (
                        <DashboardItem key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard