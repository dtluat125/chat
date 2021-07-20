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
import {useDispatch, useSelector} from "react-redux"
import { docUserId, saveUserInfo } from './features/appSlice';

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
  let chosenUser = {};
  const dispatch = useDispatch()

  const addUser = async (userInf) => {
      var chosen = checkExist(userInf);
     
      if (chosen === undefined&&userInf&&!usersLoading){
                  chosenUser = await db.collection('users').add({
                    displayName: userInf.displayName,
                    email: userInf.email,
                    emailVerified: userInf.emailVerified,
                    uid: userInf.uid,
                    photoURL: userInf.photoURL
                  })
              
              dispatch(docUserId(
                {
                  docUserId:
                    chosenUser.id
               
                }
              ))
              
              console.log("Success")
      }
      
      else{
              dispatch(docUserId(
                {
                  docUserId: 
                   chosen?.id
                  
                }
              ))
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
          <Header user = {user}/>
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
