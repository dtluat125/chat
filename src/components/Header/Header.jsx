import React from 'react';
import "../../css/header.css";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
function Header() {
    return (
        <div className="header-container">
            {/* Header Left */}
            <div className="header__left">

                <AccessTimeIcon className="access-time-icon"/>
            </div>
            {/* Header Search */}
            <div className="header__search">
              
                
                <input type="text" placeholder="Search" />
                <SearchIcon/>
        
            </div>
            {/* Header Right */}
            <div className="header__right">
                <HelpOutlineIcon/>
                <div className="header__avatar">
                <span className="user-avatar">
                    <img src="	https://ca.slack-edge.com/T027MTSUAJZ-U0283JDM2UR-94affb41c94e-72" alt="" />
                </span>
            </div>
            </div>

            
        </div>
    )
}

export default Header
