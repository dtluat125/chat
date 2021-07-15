import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { enterRoom, selectRoomId } from '../../features/appSlice'

// import {useCollection} from 'react-firebase-hooks'
function SidebarOption({icon, title, isChannel, id}) {
    console.log(id);
    const dispatch = useDispatch();
    const seeAllDm = () => {}
    const selectChannel = () => {
        if(id){
           dispatch(
               enterRoom({
                   roomId: id
               })
           )
        }
    }
    const roomId = useSelector(selectRoomId)
    return(
        (<div className={roomId === id?"sidebar__option-container active":"sidebar__option-container"} tabIndex="1" role="button" onClick={id?selectChannel:seeAllDm}>
            {icon&&
            <div className="sidebar__icon">
                {icon}
            </div>}
            {icon?
            <div className="sidebar__option__title">
                {title}
            </div> : <div className="sidebar__option__channel">
                <span>#</span> {title}
            </div>            
        } 
        
            
        </div>)
    )
}

export default SidebarOption

