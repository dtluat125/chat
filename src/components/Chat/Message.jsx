import React, { useState } from 'react'

function Message({user, userImage, message, timestamp}) {
    const [onHover, setOnHover] = useState(false);
    const hoverHandler = () => {
        setOnHover(true);
    }
    const notHoverHandler = () => {
        setOnHover(false);
    }
    return (
        <div className = {onHover?"message-container active":"message-container"} onMouseOver={hoverHandler} onMouseOut = {notHoverHandler}>
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
