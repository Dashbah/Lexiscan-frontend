import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from 'react-router-dom';
import ImageUpload from "./components/ImageUpload";

const ChatDetails = () => {
    const { chatUId } = useParams();
    const { data: chat, isPending, error } = useFetch(`http://89.169.154.190:8080/api/chat/${chatUId}/history`);
    const history = useHistory();

    return (
        <div className="chat-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {chat && (
                <article>
                    <h2>{chat.chatName}</h2>
                    <ImageUpload chatUId={chat.chatUId} />
                    {chat.imageProcessingImages.map((imageInfo) => (
                        <div className="image-info" key={imageInfo.imageUId}>
                            <p>imageUId: {imageInfo.imageUId}</p>
                            <p>percentage: {imageInfo.percentage}</p>
                            <p>processingStatus: {imageInfo.processingStatus}</p>
                        </div>
                    ))
                    }
                    {/* <button onClick={handleClick}>delete</button> */}
                </article>
            )}
        </div>
    );
}

export default ChatDetails;