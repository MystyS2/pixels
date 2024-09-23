import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className='grid place-items-center w-screen h-screen bg-black'>
            <img src='https://media1.tenor.com/m/PPOe9MawAvsAAAAd/404-not-found.gif' alt='404' />
            <h1 className='text-7xl text-white'>Page Not Found😢</h1>
            <button className="btn glass text-white hover:text-black hover:bg-primary" onClick={() => navigate('/')}>Go back to home</button>
        </div>
    )
}

export default NotFoundPage