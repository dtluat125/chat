import React from 'react'
import { useSelector } from 'react-redux'
import "../../css/chat.css"
import { selectRoomId } from '../../features/appSlice'
import ChatInput from './ChatInput'
function Chat() {
    const roomId = useSelector(selectRoomId)
    console.log(roomId)
    return (
        <div className="chat-container">
            <div className="chat__header">
                <div className="chat__header__left">
                    <span>#roomname</span>
                </div>
                <div className="chat__header__right">
                    <span>Details</span>
                </div>
            </div>

            <div className="chat-messages">

            </div>
            <ChatInput
            channelId = {roomId}
          
            />
        </div>
    )
}

export default Chat
