import React, { useState } from 'react'
import {Button} from "@material-ui/core"
import { auth, db, provider } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { useCollection } from 'react-firebase-hooks/firestore';
import { saveUserInfo } from '../../features/appSlice';
function LogIn(props){
    
    const [isSignIn, setIsSignIn] = useState(true);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const [users, usersLoading] = useCollection(db.collection('users'));
    const user = useAuthState(auth);

    
    function onSignIn(){
        setIsSignIn(false)
    }

    function onRegister(){
        setIsSignIn(true)
    }

    function onPassWordChange(e){
        setPassword(e.target.value)
    }

    function onConfirmChange(e){
        setConfirm(e.target.value)
    }

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).then(user => console.log(user.data())).catch((error) => 
        alert(error.message));
    }
    const handleRegister = (e) => {
        e.preventDefault();
        password !== confirm ? alert("You type different confirm password!"):
        auth.createUserWithEmailAndPassword(email, password).then(
            (userCred) => {
                console.log(userCred.user)
                const userInf={
                    displayName: userCred.user.displayName,
                    email: userCred.user.email,
                    emailVerified: userCred.user.emailVerified,
                    uid: userCred.user.uid,
                    photoURL: userCred.user.photoURL
                }
    
                // saveUser(userInf);
    
                dispatch(saveUserInfo({user: userInf}));
                db.collection('users').add(userInf)
            }
                
        )
        .catch(err => alert(err.message))
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then( (userCred) => {
            const userInf={
                displayName: userCred.user.displayName,
                email: userCred.user.email,
                emailVerified: userCred.user.emailVerified,
                uid: userCred.user.uid,
                photoURL: userCred.user.photoURL
            }

            let userDb ;
            if(!usersLoading&&users){
            userDb = users?.docs.find(elem => elem.data().uid === userInf.uid);
            dispatch(saveUserInfo({user: userDb?.data()}));
            console.log(userDb.data())
            }
        }
        )
        .then(() => {

        })
        .catch(err => alert(err.message))
    }

    const onEmailChange = (e) =>{
        setEmail(e.target.value)
    }




    if(isSignIn) return <SignIn
    onClick = {onSignIn} signIn = {signIn}
    password = {password}
    email = {email}
    onPassWordChange = {onPassWordChange}
    onEmailChange = {onEmailChange}
    signInEmail = {handleSignIn}

    />

    else return <Register onClick = {onRegister}
        password = {password}
        confirm ={confirm}
        email = {email}
        onPassWordChange = {onPassWordChange}
        onConfirmChange = {onConfirmChange}
        onEmailChange = {onEmailChange}
        register = {handleRegister}


    />

}

export default LogIn;

function SignIn(props){
    // function handlePassWordChange(e){

    // }

    // function handleConfirmChange(e){

    // }



    return(
        <div className="login">
            <div className="col-md-6 img-bg-container">

            </div>

            <div className="col-md-6 form-container">
            
                <span className="form__title">
                    Login to continue
                </span>
                <form method="post">
                    <div className="form__input">
                        
                            
                            <input name="form__email" type="text" className="input-area" onChange={props.onEmailChange} value={props.email} required/>
                            <span className="label-span">Email</span>
                    
                    </div>
                    <div className="form__input">
                       
                            
                            <input name="form__password" type="password" className="input-area" onChange={props.onPassWordChange} value={props.password}  required/>
                            <span className='label-span'>Password</span>
                      
                    </div>

                    <button onClick={props.signInEmail} type="submit" className="form__button">Sign in</button>
                </form>
                <div className="change-form">
                    
                    <p><span onClick={props.onClick}>REGISTER</span> if you don't have any account</p>
                    <p>Or  <Button onClick={props.signIn}>Sign in with Google</Button> </p>

                </div>
            </div>
            
        </div>
    )
}

function Register(props){
    return(
        <div className="login">
            <div className="col-md-6 img-bg-container">

            </div>

            <div className="col-md-6 form-container">
            
                <span className="form__title">
                    Register
                </span>
                <form method="post">
                    <div className="form__input">
                        
                            
                            <input name="form__email" type="text" className="input-area" value = {props.email} onChange={(e) => props.onEmailChange(e)} required/>
                            <span className="label-span">Email</span>
                    
                    </div>
                    <div className="form__input">
                       
                            
                            <input name="form__password" type="password" className="input-area" value = {props.password}  onChange={(e) => props.onPassWordChange(e)} required/>
                            <span className='label-span'>Password</span>
                      
                    </div>

                    <div className="form__input">
                       
                            
                            <input name="form__password" type="password" className="input-area" value = {props.confirm} onChange={(e) => props.onConfirmChange(e)} required/>
                            <span className='label-span'>Confirm Password</span>
                      
                    </div>

                    <button type="submit" onClick = {props.register}  className="form__button">Sign in</button>
                </form>

                <div className="change-form">
                    <p><span onClick={props.onClick}>Login</span> if you already have an account</p>
                </div>
            </div>
            
        </div>
    )
}