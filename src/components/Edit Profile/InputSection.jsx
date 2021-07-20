import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector,  } from 'react-redux';
import { selectDocId } from '../../features/appSlice';
import { db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
function InputSection(props) {
    const [user, userLoading] = useCollection(db.collection('users'));
    const [input, setInput] = useState(props.name==='displayName'?user?.displayName?user.displayName:"":props.name==='WhatIDo'?user?.whatIDo?user.whatIDo:"":'');
    const docUserId = useSelector(selectDocId);
    
    
    const [imgUrl, setImgUrl] = useState(user?.photoURL);


    const handleImgChange = (e) => {
        const src = URL.createObjectURL(e.target.files[0]);
        setImgUrl(src);
    }

    const handleUpload = () => {
        inputElement.click();
        
    }

    const handleInputChange = (e) =>{
        setInput(e.target.value)
    }
    
    const saveChange = () => {
        console.log("saved!")
        console.log(props.saveChange)
        console.log(imgUrl)
        if(props.saveChange){
            if(props.type === 'photo')
            {db.collection('users').doc(docUserId).update({
                photoURL: imgUrl
            }).catch(err => err.message);
        console.log("Saved photo")
        }
                else if(props.type === 'text'){
                    if(props.name === 'displayName')
                    db.collection('users').doc(docUserId).update({
                        displayName: input
                    });
                    else if(props.name === 'whatIDo')
                    db.collection('users').doc(docUserId).update({
                        whatIDo: input
                    });
                    console.log("Saved data")
            }
    }
    }

    useEffect(() => {
        saveChange();
    }, [props.saveChange, props.toggle])
    let inputElement;

    return (
        <div className = 'input-container'>
            <label htmlFor="" className="form-label">{props.label}</label>
            {props.type === "photo"?(
                <div>
                    
                    <img src={imgUrl} alt="" style={{width: `100%`}}/>
                    <input ref={input => inputElement = input} type="file" onChange={handleImgChange} className="photo-input" />
                    <span role="button" className = "upload-button c-button--medium" onClick={handleUpload}>Upload an image </span>
                </div>
            )
            :<input type="text" className="form-control" value = {input} onChange = {handleInputChange}/>
            }
        </div>
    )
}

export default InputSection
