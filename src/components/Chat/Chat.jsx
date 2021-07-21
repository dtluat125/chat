import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import "../../css/chat.css"
import { selectRoomId } from '../../features/appSlice'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase'
import ChatInput from './ChatInput'
import Message from './Message';

function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useCollection(roomId&&db.collection("room").doc(roomId))
    const [roomMessages, loading] = useCollection(
        roomId&&
        db.collection("room").doc(roomId).collection('messages').orderBy("timestamp", "asc")
    )
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior:"smooth"
        });
    }, [roomId, loading])
    return (
        <div className="chat-container">
            <div className="chat__header">
                <div className="chat__header__left">
                    <span>#{roomDetails?.data().name}</span>
                </div>
                <div className="chat__header__right">
                    <span>Details</span>
                </div>
            </div>

            <div className="chat-messages">
                {
                    roomMessages?.docs.map(doc => {
                        const {message, timestamp, user, userImage} = doc.data();
                        return (
                            <Message
                            key = {doc.id}
                            message = {message}
                            timestamp = {timestamp}
                            user = {user}
                            userImage = {userImage}
                            />
                            
                        )
                    })
                }
                <div className="chat-bottom" ref={chatRef}>

                </div>
            </div>
            <ChatInput
            chatRef = {chatRef}
            channelId = {roomId}
            channelName = {roomId&&roomDetails?.data().name}

            />
        </div>
    )
}

export default Chat
