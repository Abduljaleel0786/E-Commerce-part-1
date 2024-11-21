import React from 'react'
import ErrorImg from "./images/error (1).svg"

const ErrorPage = () => {
    return (
        <div className=' d-flex justify-content-center  align-items-center' style={{height:"100vh"}}>
            <div>
                <h1>Something’s wrong here...</h1>
                <img className=' img-fluid' src={ErrorImg} alt='Error' />
            </div>

        </div>
    )
}

export default ErrorPage