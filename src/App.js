import './css/main.css'
import LogIn from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './App.css';
import './css/login.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
        {/* <LogIn/> */}
        <Header/>
        <div className="work-space-body row">
          <SideBar >
          <Switch>
            <Route path="/" exact>
              
            </Route>
            
          </Switch>
          </SideBar>

      </div>
    </div>
  );
}

export default App;
