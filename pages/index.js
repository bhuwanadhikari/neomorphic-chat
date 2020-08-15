import React from 'react';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import io from 'socket.io-client';
import { serverUrl } from '../constants';
import Layout from '../components/Layout';


function Index() {


    return <>
        <Layout>
            <div className='homepage'>

                <div className="chip homechip">
                    <div className="top">go chat</div>
                    <div className="bottom">
                        go chat is the best chat app in the world with
                        more than one billion users.
                    </div>
                </div>

                <Link href='/chat'>
                    <a title="Start Chatting">
                        <div className="chip btn btn__secondary">
                            Start Chatting
                    </div>
                    </a>
                </Link>
            </div>
        </Layout>
    </>
}

export default Index;