import React from 'react'
import Navigation from './Navigation'

function Layout(props) {
    return (
        <div className="layoutContiner">
            <Navigation />
            <div className="main">
                {props.children}
            </div>
        </div>
    )
}

export default Layout
