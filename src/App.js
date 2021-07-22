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
import { docUserId, saveUserInfo, selectDocId, selectUser } from './features/appSlice';
import EditProfile from './components/Edit Profile/EditProfile';
import Reiszer from './components/Reiszer';

function App() {
  const [user, userLoading] = useAuthState(auth);
  const [users, usersLoading] = useCollection( db.collection('users'));
  const checkExist = (user) => {
    if(!usersLoading&&user){
            
            return users.docs.find((oldUserDoc) =>
            {
            return (oldUserDoc.data().uid === user.uid)
        })

    }
  }


  
  return (
    
    <div className="App">
        {/* <LogIn/> */}
        

          
          {
          userLoading?<Loading/>:
          (!user) ? (<LogIn/>):
         (
         <>
         
          <Header user = {user}/>
          <div className="work-space-body">
            <SideBar/>
            <Reiszer/>
            <Chat/>
          </div>
          <EditProfile/>
          </>)
          }
       
    </div>
  );
}

export default App;
