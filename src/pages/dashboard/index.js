import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import NavBarLogged from '../../components/NavBarLogged/NavBarLogged'
import DashboardItem from '../../components/DashboardItem/DashboardItem'
import ErrorRenderer from '../../components/ErrorRenderer/ErrorRenderer'


import './style.css'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
    const [projects, setProjects] = useState([])
    const [errors,setErrors] = useState(null)
    const [isSubmitting,setIsSubmitting] = useState(false)

    const history = useHistory()
    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')

    const handleRedirect = () =>{
        history.push('/project/new')
    }

    const handleLoadProjects = async () => {
        try {
            setIsSubmitting(true)
            if (!token || !tokenRefresh)
                return

            
            const response = await api.get('/profile', { headers: { 'x-token': token, 'x-token-refresh': tokenRefresh } })
            setProjects(response.data)
            setIsSubmitting(false)
            if(response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
        }
        catch (err) {
            setIsSubmitting(false)
            const { response } = err
            setErrors(response ? response.data.message || response.data.error : 'Não foi possível estabelecer uma conexão com o servidor')

            if(response && response.status === 401){
                console.log(response)
                localStorage.clear()
                history.push('/')
            }
        }
    }

    useEffect(() => {
        handleLoadProjects()
    }, [])

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[errors])

    return (
        <div className='dashboard-container'>
            <NavBarLogged />
            <ErrorRenderer errors={errors} />
            <div className='dashboard'>
                <h1 className='dashboard-title'>Todos os projetos</h1>
                <h2 className='dashboard-subtitle'>Clique em 'mais' para ver mais opções.</h2>
                <div className="buttons">
                    <button onClick={handleLoadProjects} disabled={isSubmitting}>Atualizar</button>
                    <button onClick={handleRedirect}>Novo</button>
                </div>
                <div className='projects-container'>
                    {!projects[0] ? <h1 className='no-projects'>Nada ainda...Crie um projeto para começar!</h1> : projects.map(project => (
                        <DashboardItem key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard