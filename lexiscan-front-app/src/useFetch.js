import {useState, useEffect} from 'react';

// has to be started with 'use'
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // starts while loading
    useEffect(() => {
        const abortController = new AbortController();
        setIsPending(true);
        fetch(url, {signal: abortController.signal})
            .then(res => {
                console.log(res)
                if (!res.ok) {
                    throw Error('could not fetch the data GET')
                }
                return res.json();
            })
            .then((data) => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(error.message);
                }
            });

        return () => abortController.abort();
    }, [url]);

    return {data, isPending, error};
}

export default useFetch;