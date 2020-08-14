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



function Chat() {


    const socket = useSocket(serverUrl)
    const [messages, setMessages] = React.useState([]);
    const [messageData, setMessageData] = React.useState({
        body: ''
    })

    React.useEffect(() => {
        function handleEvent(payload) {
            console.log(payload)
            // HelloWorld
        }
        if (socket) {
            socket.on('message', data => {
                const tempMessages = messages;
                tempMessages.push(data);
                setMessages(tempMessages)
                setMessageData({ ...messageData, body: '' })
            })
        }
    }, [socket]);

    React.useEffect(() => {

    }, [])

    console.log(messages)

    const _messageDataChange = (e) => {
        const { type, name, value } = e.target;
        setMessageData({ [name]: value });
    }

    const _send = (e) => {
        socket.emit('message', messageData)
        e.preventDefault();
    }

    return <>
        <Navigation />

        <div>here is the chatpage</div>


        <div>Messages</div>
        <div>
            <ul>
                {messages.map((instance, index) => {
                    return <li key={index}> {instance.body}</li>
                })}
            </ul>
        </div>

        <form onSubmit={_send}>
            <input name="body" type="text" value={messageData.body} onChange={_messageDataChange} />
            <button type='submit'>Submit</button>
        </form>

    </>
}

export default Chat;