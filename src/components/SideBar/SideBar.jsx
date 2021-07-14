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
function SideBar() {
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
            icon = {<ArrowDropDownIcon/>
            }
            id = {"channels"}
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
    return(
        <div className="collapse-container">
            <div className="sidebar__option-container"
            type="button" data-bs-toggle="collapse" data-bs-target={`#${props.id}`} aria-expanded="false" aria-controls={`${props.id}`}
            >
                <div className="item-icon">
                    {props.icon}
                </div>
                <div className="item-title">
                    {props.title}
                </div>
            </div>
            <div className="collapse" id={`${props.id}`}>
                {props.options && props.options.map((option) =>{return option})}

            </div>
        

        </div>
    )
}