import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

function Navigation(props) {


    React.useEffect(() => {
        const links = document.getElementsByTagName('a');
        for (let link of links) {
            if (link.getAttribute('href') === props.router.pathname) {
                link.classList.add('activeLink');
            } else {
                link.classList.remove('activeLink');
            }
        }
    }, [props.router.pathname])



    return (
        <>
            <nav className="navbar">
                <Link href='/'>
                    <a title="go-chat home page">
                        <div className="chip btn btn__secondary">
                            HOME    
                        </div>
                    </a>
                </Link>
                <Link href='/chat'>
                    <a title="Start Chatting">
                        <div className="chip btn btn__secondary">
                            CHAT
                        </div>
                    </a>
                </Link>

                <Link href='/about'>
                    <a title="go-chat about page">
                        <div className="chip btn btn__secondary">
                            ABOUT
                        </div>
                    </a>
                </Link>
            </nav >
            <div className="chip border"></div>
        </>
    )
}


export default withRouter(Navigation)
