import './css/main.css'
import LogIn from './components/Login/Login';
import './App.css';
import './css/login.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Chat from './components/Chat/Chat';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth, db } from './firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import EditProfile from './components/Edit Profile/EditProfile';

function App() {
  const [user, userLoading] = useAuthState(auth)
  const [users, usersLoading] = useCollection( db.collection('users'));
  const checkExist = (user) => {
    if(!usersLoading&&user){
            
            return users.docs.find((oldUserDoc) =>
            {
            return (oldUserDoc.data().uid === user.uid)
        })

    }
  }
  const addUser = (user) => {
      var chosen = checkExist(user);
      console.log(chosen);
      if (chosen === undefined&&user&&!usersLoading){
          console.log(user)
          if(user){
              users.add({
                  displayName: user.displayName,
                  email: user.email,
                  emailVerified: user.emailVerified,
                  uid: user.uid,
                  photoURL: user.photoURL
                  })
              }
              console.log("Success")
      }
      
      else{
          console.log('not add')
          return;
      }
  }

  useEffect(() => {
    addUser(user)
    return
  }, [user, users])

  return (
    
    <div className="App">
        {/* <LogIn/> */}
        
        <Router>
          
          {
          userLoading?<Loading/>:
          (!user) ? (<LogIn/>):
         (
         <>
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
