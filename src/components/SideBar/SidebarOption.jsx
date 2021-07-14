import React from 'react'
import { Dropdown } from 'react-bootstrap'
import SubjectIcon from '@material-ui/icons/Subject';

function SidebarOption({icon, title, isDropdown}) {
    return(
        (<div className="sidebar__option-container" role="button">
            <div className="sidebar__icon">
                {icon}
            </div>
            <div className="sidebar__option__title">
                {title}
            </div>
            
        </div>)
    )
}

export default SidebarOption

function DropdownItem({icon, title}){
    return(
        <div className="item-container">
            <div className="item-icon">
                {icon}
            </div>
            <div className="item-title">
                {title}
            </div>
        </div>
    )
}