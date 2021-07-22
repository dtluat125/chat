import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import '../../css/sidebar.css'
import SidebarOption from './SidebarOption';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import { db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
function SideBar() {
    const [channels, loading, error] = useCollection(db.collection("room"));
    const [users, usersLoading, usersError] = useCollection(db.collection('users'))
    const channelList = [];
    channels?.docs.map(doc =>channelList.push(<SidebarOption
        title = {doc.data().name}
        key = {doc.id}
        id = {doc.id}
    />))
    const usersList = [];
    users?.docs.map(doc =>usersList.push(
        <SidebarOption
        title = {doc.data().displayName}
        email = {doc.data().email}
        key = {doc.id}
        // id = {doc.id}
        photoURL = {doc.data().photoURL}
        />
    ) )

    return (
        <div className="side-bar-container">
            <SidebarHeader/>
            <SidebarCollapse options={[
                <SidebarOption
                title="All Unreads"
                icon={<ForumIcon/>}
                isDropdown={true}
                />,
                <SidebarOption
                title="Mentions & reactions" 
                icon={<AlternateEmailIcon/>}
                isDropdown={true}
                />
            ]}
            id = {"browseslack"}
            title="Browse Slack"
            icon = {<MoreVertIcon/>}
            />
            
            <SidebarCollapse
            title="Channels"
            icon = {<ArrowRightIcon/>
            }
            id = {"channels"}
            addIcon={<AddIcon/>}
            options={channelList}
            />
            
            <SidebarCollapse
            title="Direct Message"
            icon = {<ArrowRightIcon/>}
            id = "directmessage"
            options={usersList}
            />
        </div>
    )
}

export default SideBar








function SidebarHeader() {
    return (
        <div>
            <div className="side-bar__header">
                <div className="side-bar__header__button">
                    <div className="side-bar__header__info">
                         <button className="side-bar__header__team-name c-button-unstyled">
                             <span>
                                 Fetch
                             </span>
                            <KeyboardArrowDownIcon/>
                           
                         </button>

                         
                    </div>
                    
                    
                </div>
                <button className="c-button-unstyled send-button">
                             <SendRoundedIcon style={
                                 {height: 16}
                             }/>
                         </button>
            </div>
        </div>
    )
}

function SidebarCollapse(props){
    let isShowing = false;
    const addChannel = () => {
        
        const channelName = prompt('Please Enter the channel name');
        if(channelName){
            db.collection('room').add({
                name: channelName,

            })
        }

    }
    const showHandler = () => {
        isShowing = !isShowing
    }
    return(
        <div className="collapse-container">
            <div className="sidebar__option-container"
            type="button" data-bs-toggle="collapse" data-bs-target={`#${props.id}`} aria-expanded="false" aria-controls={`${props.id}`}
            onClick={showHandler}
            >
                <div className={isShowing? props.title==="Channels"?"item-icon arrow-rotate":"item-icon":"item-icon"}>
                    {props.icon}
                </div>
                <div className="item-title">
                    {props.title}
                </div>
                
            </div>
            {
                    props.addIcon && <div className= "add-channel-button" role="button" onClick={addChannel}>
                        {props.addIcon}
                    </div>
        }
        
            <div className="collapse" id={`${props.id}`}>
                {props.options && props.options.map((option) =>{return option})}

            </div>
        

        </div>
    )
}