import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import UserState from './context/user/UserState';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Footer from './components/Footer';
function App() {


  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <UserState>
        <Router>
          <div className="appWrap">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 p-0">
                <Navbar />
              </div>
              <Switch>
                <Route exact path="/">
                  <Home showAlert={showAlert} />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/login">
                  <Login showAlert={showAlert} />
                </Route>
                <Route exact path="/signup">
                  <Signup showAlert={showAlert} />
                </Route>
              </Switch>
            </div>
          </div>
          <Alert alert={alert} />
          </div>
            <Footer />
        </Router>
        </UserState>
      </NoteState>
    </>
  );
}

export default App;
