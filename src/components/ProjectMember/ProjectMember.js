import React, { useState, useRef, useCallback } from 'react'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'
import useFetch from '../../services/useFetch';
import { FiUserMinus as KickUser } from "react-icons/fi";
import './style.css'
import { useParams } from 'react-router-dom';

const ProjectMember = ({ member }) => {

    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
    const [getResponse] = useCallback(useFetch(),[]) 
    const { projectId } = useParams()
    const thisRef = useRef()

    const backgrounds = {
        role: {
            "Dono": '#ec3d3d',
            "Admin": '#803dec',
            "Desenvolvedor": '#3d9dec'
        },
    }

    const handleModalResponse = async res => {
        try {
            setIsOpenConfirmation(false)
            if (!res)
                return
            const response = await getResponse('delete', `/member/${projectId}/${member.member_id}`)
            if (response)
                thisRef.current.style.display = 'none';
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='member-holder' ref={thisRef}>
            <span className='member-name' >{member.member_name}</span>
            <span className='member-role' style={{ background: backgrounds.role[member.member_role] }}>{member.member_role}</span>
            <KickUser className='member-kick' onClick={() => setIsOpenConfirmation(true)}/>
            {isOpenConfirmation && <ConfirmDeleteModal type='membro' projectName={member.member_name} responseHandler={handleModalResponse} />}
        </div>
    )
}

export default ProjectMember