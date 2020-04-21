import React, { useRef, useState, useCallback } from 'react'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'
import useFetch from '../../services/useFetch';
import { FiTrash2 as Trash } from "react-icons/fi";
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
    const thisRef = useRef()
    const [getResponse] = useCallback(useFetch(),[]) 
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const name = `${ticket.ticket_name.slice(0, 25)}...`
    const date = new Date(ticket.ticket_creationdate * 1000).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })

    const handleModalResponse = async res => {
        try {
            setIsOpenConfirmation(false)
            if (!res)
                return
            const response = await getResponse('delete', `/tickets/${ticket.ticket_id}`)
            if (response)
                thisRef.current.style.display = 'none';
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isExpanded ?
                <div className='expanded-ticket-holder' ref={thisRef}>
                    {isOpenConfirmation ?
                        <ConfirmDeleteModal type='problema' projectName={ticket.ticket_name} responseHandler={handleModalResponse} />
                        : null}
                    <span className='ticket-name' >{ticket.ticket_name}</span>
                    <span className='ticket-date'>{date}</span>
                    <span className='ticket-summary' >{ticket.ticket_summary}</span>
                    <span className='ticket-description' >{ticket.ticket_description}</span>
                    <div className='ticket-info'>
                        <span className='ticket-type' style={{ background: backgrounds.type[ticket.ticket_type] }}>{ticket.ticket_type}</span>
                        <span className='ticket-status' style={{ background: backgrounds.status[ticket.ticket_status] }}>{ticket.ticket_status}</span>
                        <span className='ticket-severity' style={{ background: backgrounds.severity[ticket.ticket_severity] }}>{ticket.ticket_severity}</span>
                    </div>
                    <span className='ticket-madeby' >Criado por:</span>
                    <span className='ticket-madeby-name' >{` ${ticket.madeby}`}</span>
                    <div className='ticket-buttons'>
                        <span className='ticket-close' onClick={() => setIsExpanded(!isExpanded)}>Fechar</span>
                        <span className='ticket-delete' onClick={() => setIsOpenConfirmation(true)}>Deletar<Trash className='ticket-delete-svg' /></span>
                    </div>
                </div>
                :
                <div className='ticket-holder' ref={thisRef} onClick={() => setIsExpanded(!isExpanded)}>
                    <span className='ticket-name' >{name}</span>
                    <div className='ticket-info'>
                        <span className='ticket-type' style={{ background: backgrounds.type[ticket.ticket_type] }}>{ticket.ticket_type}</span>
                        <span className='ticket-status' style={{ background: backgrounds.status[ticket.ticket_status] }}>{ticket.ticket_status}</span>
                        <span className='ticket-severity' style={{ background: backgrounds.severity[ticket.ticket_severity] }}>{ticket.ticket_severity}</span>
                    </div>
                    <span className='ticket-date'>{date}</span>
                </div>}
        </>
    )
}

export default React.memo(ProjectTicket)