import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
function SideBar() {
    return (
        <div className="side-bar-container col-sm-4">
            <div className="side-bar__header">
                <div className="side-bar__header__button">
                    <div className="side-bar__header__info">
                         <button className="side-bar__header__team-name">
                             <span>
                                 Fetch
                             </span>
                            <KeyboardArrowDownIcon/>
                           
                         </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SideBar
