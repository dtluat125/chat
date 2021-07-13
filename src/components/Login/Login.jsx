import React, { useState } from 'react'

function LogIn(props){
    const [isSignIn, setIsSignIn] = useState(true);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

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

    if(isSignIn) return <SignIn onClick = {onSignIn}/>

    else return <Register onClick = {onRegister}
        password = {password}
        confirm ={confirm}
        onPassWordChange = {onPassWordChange}
        onConfirmChange = {onConfirmChange}
        isConfirmed = {password === confirm}

    />

}

export default LogIn;

function SignIn(props){
    // function handlePassWordChange(e){

    // }

    // function handleConfirmChange(e){

    // }



    return(
        <div className="login row">
            <div className="col-md-6 img-bg-container">

            </div>

            <div className="col-md-6 form-container">
            
                <span className="form__title">
                    Login to continue
                </span>
                <form action="" method="post">
                    <div className="form__input">
                        
                            
                            <input name="form__email" type="text" className="input-area" required/>
                            <span className="label-span">Email</span>
                    
                    </div>
                    <div className="form__input">
                       
                            
                            <input name="form__password" type="password" className="input-area"  required/>
                            <span className='label-span'>Password</span>
                      
                    </div>

                    <button type="submit" className="form__button">Sign in</button>
                </form>
                <div className="change-form">
                    <p>Or <span onClick={props.onClick}>register</span> if you don't have any account</p>
                </div>
            </div>
            
        </div>
    )
}

function Register(props){
    return(
        <div className="login row">
            <div className="col-md-6 img-bg-container">

            </div>

            <div className="col-md-6 form-container">
            
                <span className="form__title">
                    Register
                </span>
                <form action="" method="post">
                    <div className="form__input">
                        
                            
                            <input name="form__email" type="text" className="input-area" required/>
                            <span className="label-span">Email</span>
                    
                    </div>
                    <div className="form__input">
                       
                            
                            <input name="form__password" type="password" className="input-area"  onChange={(e) => props.onPassWordChange(e)} required/>
                            <span className='label-span'>Password</span>
                      
                    </div>

                    <div className="form__input">
                       
                            
                            <input name="form__password" type="password" className="input-area" onChange={(e) => props.onConfirmChange(e)} required/>
                            <span className='label-span'>Confirm Password</span>
                      
                    </div>

                    <button type="submit" className="form__button">Sign in</button>
                </form>

                <div className="change-form">
                    <p><span onClick={props.onClick}>Login</span> if you already have an account</p>
                </div>
            </div>
            
        </div>
    )
}