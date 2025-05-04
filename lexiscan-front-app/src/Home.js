import {useState, useEffect} from 'react';
import BlogList from "./BlogList";

const Home = () => {
    const [isPending, setIsPending] = useState(true);
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(null);

    // starts while loading
    useEffect(() => {
        setIsPending(true);
        fetch('http://localhost:8000/blogs')
            .then(res => {
                console.log(res)
                if(!res.ok) {
                    throw Error('could not fetch the data GET /blogs')
                }
                return res.json();
            })
            .then((data) => {
                setBlogs(data);
                setIsPending(false);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setIsPending(false);
            });
    }, []);

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
        </div>
    );
}

export default Home;