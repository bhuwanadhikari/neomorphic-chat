import React from 'react';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import io from 'socket.io-client';
import { serverUrl } from '../constants';
import Layout from '../components/Layout';


function Index() {


    return <>
        <Layout>
            <div>
                <div>here is the homepage</div>
            </div>
        </Layout>
    </>
}

export default Index;