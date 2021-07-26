import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../../css/chat.css"
import { enterDirectMessage, enterRoom, selectDirectMessageRoom, selectRoomId, selectUserDirect, setUserProfileUid, showSecondaryWorkspace } from '../../features/appSlice'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase'
import ChatInput from './ChatInput'
import Message from './Message';
import SmallLoader from '../SmallLoader';

function Chat() {
    const dispatch = useDispatch()
    const chatRef = useRef(null);
    const defaultRoomId = "CcfrQCURBPLWpn6lj0k8";
    // Room message
    const roomId = useSelector(selectRoomId);
    const directMessageUid = useSelector(selectUserDirect);

    if(!roomId&&!directMessageUid){
        dispatch(enterRoom({
            roomId: defaultRoomId
        }))
    }
    const [roomDetails] = useCollection(roomId&&db.collection("room").doc(roomId));
    const [roomMessages, loading] = useCollection(
        roomId&&
        db.collection("room").doc(roomId).collection('messages').orderBy("timestamp", "asc")
    )

    // Direct message
    const roomDirectId = useSelector(selectDirectMessageRoom);
    const [roomDirectDetails] = useCollection(roomDirectId&&db.collection("directRooms").doc(roomDirectId));
    const [users, usersLoading] = useCollection(db.collection('users'));
    const directUser = users?.docs.find(doc => doc.data().uid === directMessageUid)
    const [roomDirectMessages, directLoading] = useCollection(
        roomDirectId&&
        db.collection("directRooms").doc(roomDirectId).collection('messages').orderBy("timestamp", "asc")
    )
    const directTitle = directUser?.data().displayName?directUser?.data().displayName:directUser?.data().email


    // 
    // Open profile
    const openProfile = () => {
        dispatch(setUserProfileUid({
            userUid: directMessageUid
        }))
        dispatch(showSecondaryWorkspace({
            isShowingSecondaryWorkspace: true
        }))
    }

    // 
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior:"smooth"
        });
    }, [roomId, loading])
    return (
       
        <div className="chat-container">
            {loading||directLoading||usersLoading?<SmallLoader/>:
            <>
            <div className="chat__header">
                <div className="chat__header__left">
                    {roomId?<span>#{roomDetails?.data().name}</span>:<span role="button" onClick={openProfile}>{directTitle}</span>}
                </div>
                <div className="chat__header__right">
                    <span>Details</span>
                </div>
            </div>

            <div className="chat-messages">
                {
                    roomId?roomMessages?.docs.map(doc => {
                        const {message, timestamp, user, userImage, uid} = doc.data();
                        return (
                            <Message
                            key = {doc.id}
                            message = {message}
                            timestamp = {timestamp}
                            user = {user}
                            userImage = {userImage}
                            uid = {uid}
                            isDirect = {false}
                            />
                            
                        )
                    }):roomDirectMessages?.docs.map(doc => {
                        const {message, timestamp, user, userImage, uid} = doc.data();
                        return (
                            <Message
                            key = {doc.id}
                            message = {message}
                            timestamp = {timestamp}
                            user = {user}
                            userImage = {userImage}
                            uid = {uid}
                            isDirect = {true}
                            />
                            
                        )
                    }
                    )
                }
                <div className="chat-bottom" ref={chatRef}>

                </div>
            </div>
            <div className="chat__footer">
                <ChatInput
                    chatRef = {chatRef}
                    channelId = {roomId?roomId:roomDirectId}
                    channelName = {roomId?roomDetails?.data().name:directTitle}
                    isDirect = {roomId?false:true}
                />
            </div>
            </>
            }
        </div>
    )
}

export default Chat
