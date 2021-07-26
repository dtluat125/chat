import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { enterDirectMessage, selectUser, setUserProfileUid, showSecondaryWorkspace } from '../../features/appSlice';
import ProfileModal from './ProfileModal';

function Message({user, userImage, message, timestamp, uid}) {
    const userInf = useSelector(selectUser);
    const displayName = userInf.uid===uid?"You":user
    const [onHover, setOnHover] = useState(false);
    const hoverHandler = () => {
        setOnHover(true);
    }
    const notHoverHandler = () => {
        setOnHover(false);
    }
    const dispatch = useDispatch()
    const sendUserUid = () => {
        dispatch(setUserProfileUid({
            userUid: uid
        }))
        dispatch(showSecondaryWorkspace({
            isShowingSecondaryWorkspace: true
        }))
    }

    return (
        <div className = {onHover?"message-container active":"message-container"} onMouseOver={hoverHandler} onMouseOut = {notHoverHandler}>
            <img src={userImage} alt="" role="button" onClick={sendUserUid}/>
            <ProfileModal/>
            <div className="message__info">
                <div className="status">
                    <a role="button" onClick={sendUserUid}>{displayName}</a> <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </div>
                <p className="message">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Message
