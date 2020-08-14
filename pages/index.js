import React from 'react';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import io from 'socket.io-client';
import { serverUrl } from '../constants';


function Index() {


    return <>
        <Navigation />

        <div>here is the homepage</div>
    </>
}

export default Index;