import Navbar from "./Navbar";
import Home from "./Home";
import NotFound from "./NotFound"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
    Switch
} from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import Userfront, {
    SignupForm,
    LoginForm,
    PasswordResetForm,
    LogoutButton
} from "@userfront/toolkit/react";

Userfront.init("demo1234");

function App() {
    function Dashboard() {
        const userData = JSON.stringify(Userfront.user, null, 2);
        return (
            <div>
                <h2>Dashboard</h2>
                <pre>{userData}</pre>
                <button onClick={Userfront.logout}>Logout</button>
            </div>
        );
    }

    function RequireAuth({children}) {
        let location = useLocation();
        if (!Userfront.tokens.accessToken) {
            // Redirect to the /login page
            console.log('empty token');
            // return <Navigate to="/login" state={{ from: location }} replace />;
            return <div>
                <Link to="/login">Go to Login page</Link>
            </div>
        }

        return children;
    }

    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/create">
                            <Create/>
                        </Route>
                        <Route path="/blogs/:id">
                            <BlogDetails/>
                        </Route>
                        <Route path="/register">
                            <SignupForm/>
                        </Route>
                        <Route path="/login">
                            <LoginForm/>
                        </Route>
                        <Route path="/logout">
                            <LogoutButton/>
                        </Route>
                        <Route path="/reset">
                            <PasswordResetForm/>
                        </Route>
                        <Route path="/dashboard">
                            <RequireAuth>
                                <Dashboard/>
                            </RequireAuth>
                        </Route>
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
