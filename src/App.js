import './css/main.css'
import LogIn from './components/Login/Login';
import './App.css';
import './css/login.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import SidebarOption from './components/SideBar/SidebarOption';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Chat from './components/Chat/Chat';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth, db } from './firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

function App() {
  const [user, loading] = useAuthState(auth);
  const [users] = useCollection(db.collection('users'));
  const checkExUser = 0
  console.log(user)
  if(user&&users) {
    users.docs.map((exUser) => {
      if(exUser.uid === user.uid) checkExUser ++;
    })
  }
  if(checkExUser===0){
    
  }
  return (
    
    <div className="App">
        {/* <LogIn/> */}
        <Router>
          {!user ? (<LogIn/>):
         (<>
          <Header/>
          <div className="work-space-body">
            <SideBar>
              <Switch>
                <Route path="/" exact>
                
                </Route>
              </Switch>
            </SideBar>
            <Chat/>
          </div>
          </>)}
        </Router>
    </div>
  );
}

export default App;
