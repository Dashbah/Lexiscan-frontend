import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import "../styles/ChatHistoryList.css";
import CreateChat from "../Create";

const ChatHistoryList = () => {
    const { data: chats, isPending, error } = useFetch('http://89.169.154.190:8080/api/chat/history/all-user-history');

    const getInitial1 = (name) => name ? name[0].toUpperCase() : "C";

    return (
        <div>
            {/* <h2 className="chat-list-title">
                Hello! These are all your chats, {localStorage.getItem('username')}
            </h2> */}
            <div className="chat-list-container">
                <div className="chat-list-grid">
                    {chats && <CreateChat />}
                    {chats && chats.chatHistoryRs.map((chat) => (
                        <Link to={`/chats/${chat.chatUId}`} className="chat-card" key={chat.chatUId}>
                            <div className="chat-avatar">
                                {chat && getInitial1(chat.chatName)}
                            </div>
                            <div className="chat-card-main">
                                <div className="chat-card-header">
                                    <span className="chat-card-title">{chat.chatName}</span>
                                    {/* Можно добавить статус или количество сообщений */}
                                </div>
                                <div className="chat-card-meta">
                                    {chat.imageProcessingImages && chat.imageProcessingImages.length > 0
                                        ? <span>{chat.imageProcessingImages.length} images</span>
                                        : <span>No images yet</span>
                                    }
                                </div>
                            </div>
                            <span className="chat-card-arrow">→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatHistoryList;