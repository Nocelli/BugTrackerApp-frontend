import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiExternalLink as ArrowRight } from "react-icons/fi";
import ConfirmDeleteModal  from '../ConfirmDeleteModal/ConfirmDeleteModal'
import { FiTrash2 as Trash } from "react-icons/fi";
import useFetch from '../../services/useFetch';

const DashboardItem = ({ project }) => {
    const [ getResponse ] = useCallback(useFetch(), [])
    const [ isOpenConfirmation, setIsOpenConfirmation ] = useState(false)
    const thisRef = useRef()

    const handleModalResponse = async res => {
        try {
            setIsOpenConfirmation(false)
            if(!res)
                return
            const response = await getResponse('delete', `/project/${project.id}`)
            if(response)
                thisRef.current.style.display = 'none';
        } 
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='project' ref={thisRef}>
            {isOpenConfirmation ? 
            <ConfirmDeleteModal type='projeto' projectName={project.name} responseHandler={handleModalResponse} /> 
            : null}
            <Trash
                className='project-delete'
                onClick={() => {
                    setIsOpenConfirmation(true)
                }} 
            />
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