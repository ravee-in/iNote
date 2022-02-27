import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
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
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
            </div>
          </div>
          
          <Alert message="ReactJs Course"/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
