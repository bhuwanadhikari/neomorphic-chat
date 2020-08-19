import React from 'react';

import io from 'socket.io-client';
import { serverUrl } from '../constants';

import '../styles.scss';
import Layout from '../components/Layout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStop } from '@fortawesome/free-solid-svg-icons'

const useFocus = () => {
    const htmlElRef = React.useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

function Index() {
    const [socket, setSocket] = React.useState(null)
    const [connectionData, setConnectionData] = React.useState({
        isConnected: false,
        partner: null,
    })
    const [messagesArr, setMessagesArr] = React.useState([]);
    const [messageData, setMessageData] = React.useState({
        body: ''
    });
    const [inputRef, setInputFocus] = useFocus()

    const [last, setLast] = React.useState(null);

    React.useEffect(() => {
        console.log('Mounted')
        const socketIo = io(serverUrl);
        console.log(socketIo.id);
        if (socketIo) {
            setSocket(socketIo);
            setConnectionData(() => ({ ...connectionData, isConnected: true }))
        }

        function cleanup() {
            socketIo.disconnect();
            socketIo.off()
        }
        return cleanup
    }, [])


    React.useEffect(() => {
        console.log('socket changed', socket)

        if (socket) {
            socket.on('join_room', partnerId => {
                console.log('connected to partner', partnerId);
                setConnectionData(() => ({ ...connectionData, partner: partnerId }))
            });

            socket.on('leave_room', () => {
                console.log('disconnected from room');
                setConnectionData(() => ({ ...connectionData, partnerId: null }))
            });




            socket.on('receive_message', ({ from, to, body }) => {
                setMessagesArr((messagesArr) => [...messagesArr, { from, to, body }]);
                setMessageData(messageData => ({ ...messageData, body: '' }));
            });
        }


    }, [socket]);

    React.useEffect(() => {
        setLast(messagesArr.length - 1)
    }, [messagesArr]);
    React.useEffect(() => {
    }, [connectionData])


    const _messageDataChange = (e) => {
        const { type, name, value } = e.target;
        setMessageData({ [name]: value });
    }

    const _send = (e) => {
        setInputFocus();
        if (!messageData.body) return;
        socket.emit('send_message', {
            body: messageData.body,
            from: socket.id,
            to: connectionData.partner,
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
        // console.log(allMessages[allMessages.length - 1])
        allMessages[allMessages.length - 1].scrollIntoView();
    } catch (e) { }

    console.log('Connection Data:', connectionData)

    const Loader1 = <div className="circle">
        <span className="circle__btn">
            Connecting To server...
        </span>
        <span className="circle__back-1"></span>
        <span className="circle__back-2"></span>
    </div>

    const Loader2 = <div className="circle">
        <span className="circle__btn">
            Finding New Partner
        </span>
        <span className="circle__back-1"></span>
        <span className="circle__back-2"></span>
    </div>


    return <>
        <Layout>
            <div className="chatbody">
                {connectionData.isConnected && connectionData.partner ?
                    null :
                    <div>
                        {!connectionData.isConnected ? Loader1 : null}
                        {connectionData.isConnected ? Loader2 : null}
                    </div>
                }

                <div>
                    <ul>
                        {connectionData.isConnected && connectionData.partner ?
                            <div className='chip connectionMessage'>An stranger connected, say {" "} <b> {" "}Hi</b></div> :
                            null
                        }
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
                            ref={inputRef}
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

export default Index;