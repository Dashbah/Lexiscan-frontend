import Navbar from "./Navbar";
import Home from "./components/Home";
import NotFound from "./NotFound"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import CreateChat from "./Create";
import ChatDetails from "./ChatDetails";

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { Logout } from './components/Logout';
import ChatHistoryList from "./components/ChatHistoryList";

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <div className="content">
                        <Switch>
                            <ProtectedRoute exact path="/create-chat" component={CreateChat} />
                            <ProtectedRoute exact path="/chats" component={ChatHistoryList} />
                            <Route path="/chats/:chatUId">
                                <ChatDetails />
                            </Route>
                            <Route path="/register">
                                <RegisterForm />
                            </Route>
                            <Route path="/login">
                                <LoginForm />
                            </Route>
                            <Route path="/logout">
                                <Logout />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
