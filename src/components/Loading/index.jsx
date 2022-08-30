import React from 'react'
import './index.scss'

function Loading(props) {
    return (
        <div className='loading-wrapper'>
            <div className="center-body">
                <div className="loader-circle-105">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Loading