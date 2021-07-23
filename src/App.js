import './css/main.css'
import LogIn from './components/Login/Login';
import './App.css';
import './css/login.css'
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Chat from './components/Chat/Chat';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth, db } from './firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {useEffect, useState } from 'react';
import Loading from './components/Loading';
import EditProfile from './components/Edit Profile/EditProfile';
import Reiszer from './components/Reiszer';
import SecondaryView from './components/SecondaryView';

function App() {
  const [user, userLoading] = useAuthState(auth);
  // set status to Online
  const [users, usersLoading] = useCollection(db.collection('users'));
  const userDb = users?.docs.find(elem => elem.data().uid === user?.uid);
  const setStatusToOnline = () => {
    (db.collection('users'))?.doc(userDb?.id)?.update({
      isOnline: true
    })
  }
  console.log(userDb?.data())
  useEffect(() => {
    if(user&&userDb){
      setStatusToOnline();
    }
  }, [user, userDb])
  // Dragbar Logic
  const [sideBarWidth, setSideBarWidth] = useState(200);
  const handleResize = (e) => {
    let prevX = e.clientX;
    window.addEventListener('mousemove',mousemove);
    window.addEventListener('mouseup', mouseup);
    function mousemove (e) {
        let width = sideBarWidth + e.clientX - prevX;
        setSideBarWidth(width<200?200:width>500?500:width);
    }
    
    function mouseup(){
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseup', mouseup);
    }

  }
  // End Dragbar
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
            <SideBar width={sideBarWidth}/>
            <Reiszer onMouseDown = {handleResize}/>
            <Chat/>
            <SecondaryView/>
          </div>
          <EditProfile/>
          </>)
          }

    </div>
  );
}

export default App;
