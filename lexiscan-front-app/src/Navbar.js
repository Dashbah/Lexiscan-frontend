import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>THE NAVBAR</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create-chat" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>New Chat</Link>
            </div>
        </nav>
    );
}

export default Navbar;