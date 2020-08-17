import React from 'react'
import Head from 'next/head'
import Navigation from '../components/Navigation'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above



function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="theme-color" content="#E4EBF5" />
                <title>Go Chat</title>
            </Head>
            <div className="components">

                <Navigation />
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default MyApp