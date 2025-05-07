import Navbar from "./Navbar";
import Home from "./Home";
import NotFound from "./NotFound"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";

import {AuthProvider} from './contexts/AuthContext';
import {ProtectedRoute} from './components/ProtectedRoute';
import {RegisterForm} from './components/RegisterForm';
import {LoginForm} from './components/LoginForm';
import {Logout} from './components/Logout';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar/>
                    <div className="content">
                        <Switch>
                            <ProtectedRoute path="/create" component={Create} />
                            <Route path="/blogs/:id">
                                <BlogDetails/>
                            </Route>
                            <Route path="/register">
                                <RegisterForm/>
                            </Route>
                            <Route path="/login">
                                <LoginForm/>
                            </Route>
                            <Route path="/logout">
                                <Logout/>
                            </Route>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route path="*">
                                <NotFound/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
