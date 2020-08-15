import React from 'react';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import io from 'socket.io-client';
import { serverUrl } from '../constants';

import '../styles.scss';
import Layout from '../components/Layout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStop } from '@fortawesome/free-solid-svg-icons'



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

            socket.on('connection', data => {

            })

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

    const _keyDown = (e) => {
        console.log(e);
        if (e.Key === 'Enter') {
            _send()
        }
    }

    return <>
        <Layout>
            <div className="chatbody">
                <div>
                    <ul>
                        {messages.map((instance, index) => {
                            return <div className={`chip message`} key={index}> {instance.body}</div>
                        })}


                        <div className={``}> <div className={`chip message `}> Hello</div></div>
                        <div className={``}> <div className={`chip message`}> Hello</div></div>
                        <div className={`mero`}> <div className={`chip message`}> Hello</div></div>
                        <div className={`mero`}> <div className={`chip message `}> Hello</div></div>
                        <div className={``}> <div className={`chip message`}> Hello</div></div>
                        <div className={``}> <div className={`chip message `}> Hello</div></div>
                        <div className={`mero`}> <div className={`chip message `}> Hello</div></div>
                    </ul>
                </div>


            </div>

            <div className="footerWrapper">
                <form className="footer" onSubmit={_send}>

                    <div className="btn btn__secondary"><p>
                        <FontAwesomeIcon icon={faStop} style={{ fontSize: '18px' }} color="#ef5783" />

                    </p></div>
                    <div className="form messageInput">
                        <input
                            className="form__input"
                            name="body"
                            type="text"
                            value={messageData.body}
                            onChange={_messageDataChange}
                            placeholder="Type your message..."
                            onKeyDown={_keyDown}
                        />
                    </div>
                    <div
                        className="btn btn__secondary iconButton"
                    >
                        <p>
                            <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '18px' }} color="#ef5783" /> </p>
                    </div>
                </form>
            </div>
        </Layout>


    </>
}

export default Chat;