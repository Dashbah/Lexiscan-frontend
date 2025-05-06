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
import {LoginForm} from './components/LoginForm';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar/>
                    <div className="content">
                        <Switch>
                            <Route path="/create">
                                <Create/>
                            </Route>
                            <Route path="/blogs/:id">
                                <BlogDetails/>
                            </Route>
                            <Route path="/login">
                                <LoginForm/>
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
