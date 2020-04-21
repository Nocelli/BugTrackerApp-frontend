import React from 'react'
import { Link } from 'react-router-dom'
import { FiExternalLink as ArrowRight } from "react-icons/fi";

const DashboardItem = ({ project }) => {
    return (
        <div className='project'>
            <h1 className='project-title' >{project.name}</h1>
            <h2 className='project-summary' >{project.summary}</h2>
            <div className='project-role'>
                <h2>Cargo:</h2>
                <h3 className={`project-ownership-${project.Role === 'Dono' ? 'dono' : project.Role === 'Admin' ? 'admin' : 'dev'}`} >{project.Role}</h3>
            </div>
            <div className='project-links'>
                <Link className='project-link' to={`project/${project.id}`}>Mais <ArrowRight className='project-link-svg' fill="none" stroke="#00C968" /></Link>
            </div>
        </div>
    )
}

export default DashboardItem