import React from 'react'
import './style.css'

const ProjectMember = ({ member }) => {

    const backgrounds = {
        role: {
            "Dono": '#ec3d3d',
            "Admin": '#803dec',
            "Desenvolvedor": '#3d9dec'
        },
    }

    return (
        <div className='member-holder'>
            <span className='member-name' >{member.member_name}</span>
            <span className='member-role' style={{ background: backgrounds.role[member.member_role] }}>{member.member_role}</span>
        </div>
    )
}

export default ProjectMember