import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux'
import '../css/secondaryview.css'
import { selectSecondaryWorkspaceStatus, selectUserProfileUid, showSecondaryWorkspace } from '../features/appSlice'
import { db } from '../firebase';
function SecondaryView() {
    const userUid = useSelector(selectUserProfileUid);
    console.log(userUid)
    const [users, loading] = useCollection(db.collection('users'));
    const user = users?.docs.find(elem => elem.data().uid === userUid)
    const photoURL = user?.data().photoURL?user.data().photoURL:"default-avatar.jpg";
    const title = user?.data().displayName?user.data().displayName:"NULL";
    const isOpen = useSelector(selectSecondaryWorkspaceStatus);
    const dispatch = useDispatch();
    const closeWorkspace = () => {
        dispatch(showSecondaryWorkspace({
            isShowingSecondaryWorkspace: false
        }))
    }
    return (
        <div className={isOpen?"secondary-view-container active":"secondary-view-container"}>
            <div className="secondary-view__header">
                <div className="secondary-view__header__left">
                    <span>Profile</span>
                </div>
                <div className="secondary-view__header__right">
                    <button className="c-button-unstyled" onClick={closeWorkspace}>X</button>
                </div>
            </div>

            <div className="secondary-view__body">
                <div className="member-profile__avatar-container">
                    <img src={photoURL} alt="" />
                </div>
                <div className="member-profile__name">
                    <div className="member-profile__name-title">
                        {title}
                    </div>
                    <div className="member-profile__status">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondaryView
