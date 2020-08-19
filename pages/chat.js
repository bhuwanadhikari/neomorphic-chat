import React from 'react';

import io from 'socket.io-client';
import { serverUrl } from '../constants';
import Router from 'next/router'

import '../styles.scss';
import Layout from '../components/Layout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStop } from '@fortawesome/free-solid-svg-icons'

const useFocus = () => {
    const htmlElRef = React.useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

function cleanup(socket) {
    socket.disconnect();
    socket.off()
}

function connectToServer(url) {
    return io(url);
}
const
    CONNECTING = 'Connecting To Server..',
    FINDING = 'Searching Partner...';



function Chat() {
    const [time, setTime] = React.useState(0)
    const [socket, setSocket] = React.useState(null)
    const [partner, setPartner] = React.useState(null);
    const [connectionState, setConnectionState] = React.useState(CONNECTING);
    const [partnerDied, setPartnerDied] = React.useState(false);
    const [messagesArr, setMessagesArr] = React.useState([]);
    const [messageData, setMessageData] = React.useState({
        body: ''
    });
    const [inputRef, setInputFocus] = useFocus()

    const [last, setLast] = React.useState(null);


    React.useEffect(() => {
        console.log('Mounted')
        const socketIo = connectToServer(serverUrl);
        if (socketIo) {
            setSocket(socketIo);
            setConnectionState(FINDING);
            setPartnerDied(false)
        }
        return () => cleanup(socketIo)
    }, [])


    const restartConnection = () => {
        cleanup(socket);
        const socketIo = connectToServer(serverUrl);
        setSocket(socketIo);
        setMessagesArr([]);;
        setPartnerDied(false);
        setConnectionState(FINDING)
    }

    React.useEffect(() => {
        console.log('socket changed', socket)



        if (socket) {
            socket.on('join_room', partnerId => {
                console.log('connected to partner', partnerId);
                setConnectionState(null);
                setPartner(partnerId)
            });

            socket.on('leave_room', () => {
                console.log('disconnected from room');
                setConnectionState(null);
                setPartnerDied(true);
                setPartner(null)
            });

            socket.on('receive_message', ({ from, to, body }) => {
                setMessagesArr((messagesArr) => [...messagesArr, { from, to, body }]);
                setMessageData(messageData => ({ ...messageData, body: '' }));
            });
        }


    }, [socket]);

    React.useEffect(() => {
        setLast(messagesArr.length - 1);
        setTime((new Date()).getTime());
    }, [messagesArr, partnerDied, connectionState, partner]);


    const _messageDataChange = (e) => {
        const { type, name, value } = e.target;
        setMessageData({ [name]: value });
    }

    const _nextChat = () => {
        restartConnection();
    }

    const _send = (e) => {
        e.preventDefault();
        setInputFocus();
        if (!messageData.body) return;
        socket.emit('send_message', {
            body: messageData.body,
            from: socket.id,
            to: partner,
        })
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
    try {
        document.getElementsByClassName("nextChat")[0].scrollIntoView();
    } catch (e) { }


    let Loader = null;
    if (connectionState === CONNECTING || connectionState === FINDING) {

        Loader = <div className="circle">
            <span className="circle__btn">
                {connectionState}
            </span>
            <span className="circle__back-1"></span>
            <span className="circle__back-2"></span>
        </div>

    }


    return <>
        <Layout>
            <div className="chatbody">
                {Loader}

                <div>
                    <ul>
                        {!connectionState && partner ?
                            <div className='chip connectionMessage'>An stranger connected, say <strong> &nbsp;Hi</strong></div> :
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

                        {!partner && partnerDied ?
                            <div className='chip connectionMessage'>User Disconnected</div> :
                            null
                        }

                        {!partner && partnerDied ?
                            <div
                                className="btn btn__primary nextChat"
                                onClick={_nextChat}
                            >
                                <p>Next Chat</p>
                            </div> :
                            null
                        }


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

                    <div onClick = {_send} className="btn btn__secondary"><p>
                        <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '18px' }} color="#ef5783" />
                    </p></div>

                </form>
            </div>
        </Layout>


    </>
}

export default Chat;