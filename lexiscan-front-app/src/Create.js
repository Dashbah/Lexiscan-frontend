import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateChat = () => {
    // const [chatUId, getChatUId] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const token = localStorage.getItem('token');

    const handleSubmit = (e) => {
        // prevents from reloading while submit
        e.preventDefault();
        setIsPending(true);

        fetch('http://89.169.154.190:8080/api/chat/new', {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Accept': '*/*',
            }
        }).then(res => {
            if (res.ok) {
                console.log('new blog added');
                setIsPending(false);
                history.push('/'); // redirects to a home page
            } else if (res.status === 403) {
                throw new Error('Unauthorized');
            } else {
                throw new Error('Adding chat error');
            }
        })

    }

    return (
        <div className="create">
            <h2>Add a New Chat</h2>
            {!isPending && <button onClick={handleSubmit}>Add</button>}
            {isPending && <button disabled>Adding new Chat...</button>}
        </div>
    );
}

export default CreateChat;