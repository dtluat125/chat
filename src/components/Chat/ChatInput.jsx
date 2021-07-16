import React, { useState } from 'react'
import { db } from '../../firebase';
import firebase from 'firebase';
function ChatInput({channelName, channelId, chatRef}) {
    const [input, setInput] = useState("");
    const sendMessage = (e) => {
        e.preventDefault();
        if(!channelId) return false;
        db.collection("room").doc(channelId).collection("messages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: "Luatdtrai",
            userImage: 'https://yt3.ggpht.com/yti/APfAmoELaY-5d7PJVzysHz93xIWwDfkCzVPHdivIZGzm=s88-c-k-c0x00ffffff-no-rj-mo'
        });
        setInput("")
    }
    chatRef?.current?.scrollIntoView({
        behavior:"smooth"
    });

    const inputChangeHandler = (e) => {
        setInput(e.target.value)
    }
    return (
        <div className="chat-input-container">
            <form >
                <input value={input} type="text" onChange={inputChangeHandler} placeholder={`Message #${channelName}`} />
                <button onClick={(e) => sendMessage(e)} type="submit">Send</button>
            </form>
        </div>
    )
}

export default ChatInput
