import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'

function Home(props) {
    const { data } = useSelector(state => state.user)

    useEffect(() => {
        localStorage.setItem('token', data.token)
    }, [])
    const logOut = e => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div>
            <button onClick={logOut}>log out</button>
            <h1>{data.userName}</h1>
        </div>
    )
}

export default Home