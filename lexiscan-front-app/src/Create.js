import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/CreateChatCard.css';

const CreateChat = () => {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const history = useHistory();
    const token = localStorage.getItem('token');

    const handleCreate = (e) => {
        e.preventDefault();
        setIsPending(true);
        setIsError(false);

        fetch('http://89.169.154.190:8080/api/chat/new', {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Accept': '*/*',
            }
        }).then(res => {
            if (res.ok) {
                setIsPending(false);
                window.location.reload();
            } else if (res.status === 403) {
                history.push('/login');
            } else {
                setIsPending(false);
                setIsError(true);
            }
        });
    };

    return (
        <button className="chat-add-card" onClick={handleCreate} disabled={isPending}>
            <span className="chat-add-icon">＋</span>
            <span className="chat-add-text">
                {isPending ? "Creating..." : "Add new chat"}
            </span>
            {isError && <span className="chat-add-error">Error!</span>}
        </button>
    );
};

export default CreateChat;