import React from 'react'
import './NoMatchRoute.css'

const NoMatchRoute = () => {

    return (
        <div className = "noMatchBox">
            <h2>Oops!  Can't find that page!</h2>
            <div>
                If you think this is in error, send Derek a <a href="mailto:derek@bostonssc.com">message</a>
            </div>
        </div>
    )
}
export default NoMatchRoute