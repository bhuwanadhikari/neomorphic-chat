import React from 'react'
import Navigation from './Navigation'

function Layout(props) {
    return (
        <div className="layoutContiner">
            <div className="main">
                {props.children}
            </div>
        </div>
    )
}

export default Layout
