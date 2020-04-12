import React from 'react'
import { ReactComponent as NotFound } from '../../assets/page_not_found.svg'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from 'react-router-dom'

import './style.css'

const LandingPage = () => {
    return (
        <div className='pag404'>
            <NavBar/>
            <div className='pag404-container'>
                <h1>Página não encontrada</h1>
                <Link className='back-link' to="/">Voltar</Link>
                <NotFound className='pag404-svg'/>
            </div>
        </div>
    )
    
}

export default LandingPage