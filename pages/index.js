import Link from 'next/link'

function Index() {
    return <>
        <div>this is the homepage</div>
        <Link href="/chat" >
            <a title = "Chat with strangers">Start Chatting</a>
        </Link>
    </>
}

export default Index;