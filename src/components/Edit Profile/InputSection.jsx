import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector,  } from 'react-redux';
import { selectDocId, selectUser } from '../../features/appSlice';
import { db, storage } from '../../firebase';
function InputSection(props) {
    const docUserId = useSelector(selectDocId);
    const user = useSelector(selectUser);
    const inputInit = props.name==='displayName'?user.displayName?user.displayName:"":props.name==='whatIDo'?user.whatIDo?user.whatIDo:"":"";
    const [input, setInput] = useState(inputInit);
    const [imgUrl, setImgUrl] = useState(user.photoURL);

    const handleImgChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file);
        setImgUrl(await fileRef.getDownloadURL()) ;
    }

    const handleUpload = () => {
        inputElement.click();
        
    }

    const handleInputChange = (e) =>{
        setInput(e.target.value)
    }
    const [users, loading] = useCollection(db.collection('users'));
    const selectedDoc =  users?.docs.find(elem => elem.data().uid === user.uid)
    const id = selectedDoc?.id
    const saveChange = async () => {
        let users = db.collection('users')
        if(!loading&& id&&users)
        {
        if(props.saveChange){
            if(props.type === 'photo')
            {await users.doc(id).update({
                photoURL: imgUrl
            }).catch(err => alert( err.message));
        }
                else if(props.type === 'text'){
                    if(props.name === 'displayName')
                    await users.doc(id).update({
                        displayName: input
                    }).catch(err =>alert( err.message));
                    else if(props.name === 'whatIDo')
                    await users.doc(id).update({
                        whatIDo: input
                    }).catch(err =>alert( err.message));
            }
    }}
        
    }

    
    useEffect(() => {
        saveChange();
    }, [props.toggle])
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
