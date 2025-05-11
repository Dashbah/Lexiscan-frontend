import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// has to be started with 'use'
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    const token = localStorage.getItem('token');

    const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': '*/*',
    };

    // starts while loading
    useEffect(() => {
        const abortController = new AbortController();
        setIsPending(true);
        fetch(url, {
            signal: abortController.signal,
            headers
        })
            .then(res => {
                console.log(res)
                if (res.status === 403) {
                    history.push('/login');
                }
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

    return { data, isPending, error };
}

export default useFetch;