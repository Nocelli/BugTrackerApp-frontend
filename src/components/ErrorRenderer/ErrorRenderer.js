import React from 'react'
import './style.css'

const ErrorRenderer = ({ errors }) => {
    const showErrors = (errors) =>(
        errors ? 
        <div className='error-message'>
                {errors}
        </div> : null
    )
    return(
    <>
        {showErrors(errors)}
    </>
    )
}

export default ErrorRenderer

