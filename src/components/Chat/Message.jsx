import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { enterDirectMessage, setUserProfileUid, showSecondaryWorkspace } from '../../features/appSlice';
import ProfileModal from './ProfileModal';

function Message({user, userImage, message, timestamp, uid}) {
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
                    <a role="button" onClick={sendUserUid}>{user}</a> <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </div>
                <p className="message">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Message
