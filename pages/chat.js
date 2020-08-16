import React from 'react';

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
    }, [])
    return socket
}



function Chat() {
    const socket = useSocket(serverUrl)
    const [messagesArr, setMessagesArr] = React.useState([]);
    const [messageData, setMessageData] = React.useState({
        body: ''
    });

    const [last, setLast] = React.useState(null)

    React.useEffect(() => {
        function handleEvent(payload) {
            console.log(payload)
            // HelloWorld
        }
        if (socket) {

            socket.on('connection', data => {

            })

            socket.on('message', data => {
                setMessagesArr((messagesArr) => [...messagesArr, data]);
                setMessageData(messageData => ({ ...messageData, body: '' }));
            })
        }
    }, [socket]);

    React.useEffect(() => {
        console.log(messagesArr.length)
        setLast(messagesArr.length - 1)
    }, [messagesArr])


    const _messageDataChange = (e) => {
        const { type, name, value } = e.target;
        setMessageData({ [name]: value });
    }

    const _send = (e) => {
        if (!messageData.body) return;
        socket.emit('message', {
            body: messageData.body,
            from: socket.id,
            to: null,
        })
        e.preventDefault();
    }

    const _keyDown = (e) => {
        if (e.Key === 'Enter') {
            _send()
        }
    }

    try {
        var allMessages = document.getElementsByClassName("message");
        console.log(allMessages[allMessages.length - 1])
        allMessages[allMessages.length - 1].scrollIntoView();
    } catch (e) { }


    console.log("last element is", last)

    return <>
        <Layout>
            <div className="chatbody">
                <div>
                    <ul>
                        {messagesArr.map((instance, index) => {

                            const isMine = instance.from === socket.id
                            return <div
                                className={`${isMine ? 'mero' : null}`} key={index}
                            >
                                
                                {!isMine ? <div className='chip him'>Mikky</div> : null}
                                <div className={`chip message `}>
                                    {instance.body}
                                </div>
                                {isMine ? <div className='chip me'>You</div> : null}
                                
                            </div>
                        })}
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
                            autoComplete="off"
                        />
                    </div>
                    <div
                        className="btn btn__secondary iconButton"
                        onClick={_send}
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