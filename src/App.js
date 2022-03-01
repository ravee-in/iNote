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
import Login from './components/Login';
import Signup from './components/Signup';

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
        <Router>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 p-0 bg-dark-main ">
                <Navbar />
              </div>
              <Switch>
                <Route exact path="/">
                  <Home showAlert={showAlert} />
                </Route>
                <Route exact path="/about">
                  <About />
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
        </Router>
      </NoteState>
    </>
  );
}

export default App;
