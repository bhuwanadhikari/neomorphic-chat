import React from 'react';

import '../styles.scss';


const Test = (props) => {

    const [data, setData] = React.useState({
        status: false,
        value: null,
    });

    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        setData({ ...data, value: count })
    }, [count])

    console.log('Connection Data:', count)



    return <>

        <h1>{JSON.stringify(data)}</h1>

        <button onClick={() => {
            setCount(count + 1)
        }}>increase</button>

    </>
}

export default Test;