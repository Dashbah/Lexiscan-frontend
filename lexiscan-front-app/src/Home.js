import ChatHistoryList from "./ChatHistoryList";
import useFetch from "./useFetch";

const Home = () => {
    const { data: chats, isPending, error } = useFetch('http://89.169.154.190:8080/api/chat/history/all-user-history');

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/*TODO: add this via useState*/}
            <p>Hello, {localStorage.getItem('username')}!</p>
            {chats && <ChatHistoryList chats={chats.chatHistoryRs} title="All Chats" />}
        </div>
    );
}

export default Home;