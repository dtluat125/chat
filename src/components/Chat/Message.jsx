import React from 'react'

function Message({user, userImage, message, timestamp}) {
    return (
        <div className = "message-container">
            <img src={userImage} alt="" />
            <div className="message__info">
                <h4>
                    {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p className="message">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Message
