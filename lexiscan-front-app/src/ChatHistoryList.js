import { Link } from "react-router-dom";

const ChatHistoryList = ({ chats, title }) => {
    return (
        <div className="chat-list">
            <h2>{title}</h2>
            {chats.map((chat) => (
                <div className="chat-preview" key={chat.chatUId}>
                    <Link to={`/chats/${chat.chatUId}`}>
                        <h2>chatName: {chat.chatName}</h2>
                        <p>Written by {chat.author}</p>
                        <p>imageUid: {chat.imageUID}</p>
                        <p>images: list...</p>
                        {/*    map by imageProcessingImages*/}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ChatHistoryList;