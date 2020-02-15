import React from 'react'
import "./Home.css"

const Home = () => {
    return (
        <div className = "homeBox">
            <h1>
                Version One
            </h1>
            <ul>
                <li>
                    Implemented provider pages and info, news and messages, and documentation.
                </li>
            </ul>
            <h2>
                To Do
            </h2>
            <ul>
                <li>
                    Add more documentation
                </li>
                <li>
                    Add more outside links
                </li>
            </ul>

            <div>
                Have an idea you'd like to see?  Message <a href="mailto:derek@bostonssc.com">Derek</a>
            </div>
        </div>
    )
}

export default Home