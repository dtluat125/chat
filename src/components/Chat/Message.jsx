import React from 'react'

function Message({user, userImage, message, timestamp}) {
    return (
        <div className = "message-container">
            <img src={userImage} alt="" />
            <div className="message__info">
                <div className="status">
                    <a href="">{user}</a> <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </div>
                <p className="message">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Message
