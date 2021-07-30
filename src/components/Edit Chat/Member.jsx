import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setSelectedUser, setUserProfileUid } from '../../features/appSlice';

function Member({user, roomOwner}) {
    const dispatch = useDispatch()
    const loginUser = useSelector(selectUser)
    const photoURL = user?.photoURL?user.photoURL:"default-avatar.jpg";
    const name = user?.displayName?user.displayName:user.email;
    const status = user?.isOnline;
    const sendUserUid = () => {
        dispatch(setSelectedUser({
            selectedUser: user
        }))
    }
    console.log(roomOwner?.uid, loginUser.uid)
    return (
        <div className="member" role="button" data-bs-toggle="modal"
        data-bs-target="#profileModal" onClick={sendUserUid}>
            <div className = "member__info">
                <div className="member__avatar" style={{backgroundImage: `url(${photoURL})`}}></div>
                <div className="member__name"><strong>{name} {user?.uid===loginUser.uid?"(You)":""}</strong></div>
                <div className="member__status"><FiberManualRecord className = {status?"status active":"status"}/></div>
            </div>
            {(loginUser?.uid === roomOwner?.uid)&&
            <div className="remove-button">
                <span role="button" data-bs-toggle="modal" data-bs-target = "#removeAlertModal"><strong>Remove</strong></span>
            </div>}
        </div>
    )
}

export default Member
