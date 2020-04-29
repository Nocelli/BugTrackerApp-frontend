import React, { useEffect, useContext } from 'react'
import './style.css'
import { AuthContext } from '../../Auth/AuthContext'
import { ReactComponent as Splash } from '../../assets/splash.svg'
import { ReactComponent as Access } from '../../assets/access.svg'
import { ReactComponent as Free } from '../../assets/free.svg'
import { ReactComponent as Config } from '../../assets/Configuration.svg'

const LandingPage = () => {
    const { setAuth } = useContext(AuthContext)

    useEffect(() => {
        setAuth()
    }, [setAuth])

    return (
        <>
            <dir className='svg-container' >
                <Splash className='landing-svg' />
                <div className='svg-Text'>
                    <h1>Acompanhe seus projetos.</h1>
                    <h2>Crie sua conta gratuita, e comece a rastrear problemas em seus projetos com sua equipe onde quer que esteja!</h2>
                </div>
            </dir>
            <div className='topics-container'>
                <div className='topic-card'>
                    <Access className='topic-svg' />
                    <h1 className='topic-main'>Acessibilidade</h1>
                    <h2 className='topic-text'>Tudo o que você precisa para acessar o aplicativo BugHero é um navegador e uma conexão à Internet.</h2>
                </div>
                <div className='topic-card'>
                    <Config className='topic-svg' />
                    <h1 className='topic-main'>Configuração rápida</h1>
                    <h2 className='topic-text'>O aplicativo BugHero já está instalado e configurado na nuvem. Isso minimiza atrasos comuns, resultantes da implantação tradicional de software muitas vezes demorada</h2>
                </div>
                <div className='topic-card'>
                    <Free className='topic-svg' />
                    <h1 className='topic-main'>Sem Custos</h1>
                    <h2 className='topic-text'>100% grátis, basta criar uma conta e começar a gerenciar seus projetos!</h2>
                </div>
            </div>
        </>
    )

}

export default LandingPage