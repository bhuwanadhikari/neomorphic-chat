import React from 'react';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import io from 'socket.io-client';
import { serverUrl } from '../constants';



function useSocket(url) {
    const [socket, setSocket] = React.useState(null)

    React.useEffect(() => {
        const socketIo = io(url)

        setSocket(socketIo)

        function cleanup() {
            socketIo.disconnect()
        }
        return cleanup

        // should only run once and not on every re-render,
        // so pass an empty array
    }, [])

    return socket
}



function Index() {


    const socket = useSocket(serverUrl)

    React.useEffect(() => {
        function handleEvent(payload) {
            console.log(payload)
            // HelloWorld
        }
        if (socket) {
            socket.on('SOME_EVENT', handleEvent)
        }
    }, [socket])

    return <>
        <Navigation />

        <div>here is the homepage</div>
    </>
}

export default Index;