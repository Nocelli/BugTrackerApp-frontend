import React from 'react'
import './style.css'

const ProjectTicket = ({ ticket }) => {

    const backgrounds = {
        type: {
            "subtarefa": '#4DA8D6',
            "bug": '#D64D4D',
            "aperfeiçoamento": '#7CD64D',
            "novo recurso": '#56D64D',
            "tarefa": '#4DD6C4'
        },
        severity: {
            "nenhum": '#676767',
            "crítico": '#D64D4F',
            "grave": '#764DD6',
            "não-urgente": '#4DCFD6'
        },
        status: {
            'aberto': '#D64D4F',
            'em andamento': '#764DD6',
            'para ser testado': '#4DCFD6',
            'fechado': '#676767'
        }
    }

    const name = `${ticket.ticket_name.slice(0, 28)}...`
    const date = new Date(ticket.ticket_creationdate * 1000).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
    console.log(date);

    return (
        <div className='ticket-holder'>
            <span className='ticket-name' >{name}</span>
            <span className='ticket-type' style={{ background: backgrounds.type[ticket.ticket_type] }}>{ticket.ticket_type}</span>
            <span className='ticket-status' style={{ background: backgrounds.status[ticket.ticket_status] }}>{ticket.ticket_status}</span>
            <span className='ticket-severity' style={{ background: backgrounds.severity[ticket.ticket_severity] }}>{ticket.ticket_severity}</span>
            <span className='ticket-date'>{date}</span>
        </div>
    )
}

export default ProjectTicket