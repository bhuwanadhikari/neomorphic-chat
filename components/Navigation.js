import React from 'react'
import Link from 'next/link'

function Navigation() {
    return (
        <nav className = "components navbar">
            <div>
                <Link href='/chat'>
                    <a title="Start Chatting">Start Chatting</a>
                </Link>

                <Link href='/'>
                    <a title="go-chat home page">Home</a>
                </Link>


                <Link href='/about'>
                    <a title="go-chat about page">About</a>
                </Link>
            </div>
        </nav>
    )
}

export default Navigation
