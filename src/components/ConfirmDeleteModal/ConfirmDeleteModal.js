import React from 'react'

const ConfirmDeleteModal = ({ type, projectName, responseHandler }) => {

    return (
        <div className='modal'>
            <div className='modal-form'>
                <h1>{`Tem certeza de que deseja excluir este ${type}?`}</h1>
                <h2>{`"${projectName}"`}</h2>
                <div className='modal-buttons'>
                    <button className='deleteButton' onClick={() => {
                        responseHandler(true)
                    }}>Deletar</button>
                    <button onClick={() => {
                        responseHandler(false)
                    }}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ConfirmDeleteModal)