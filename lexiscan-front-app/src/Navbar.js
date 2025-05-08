import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><Link to='/hello'>LEXISCAN</Link></h1>
            <div className="links">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link>
            </div>
        </nav>
    );
}

export default Navbar;