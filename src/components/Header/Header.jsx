import React from 'react';
import "../../css/header.css";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Dropdown } from 'react-bootstrap';
function Header() {
    return (
        <div className="header-container">
            {/* Header Left */}
            <div className="header__left">
                <Dropdown className="history-dropdown dropdown">
                    <Dropdown.Toggle className="c-button-unstyled dropdown-toggle" id="historyDropdown" variant="success">
                        <AccessTimeIcon className="access-time-icon"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu" aria-labelledby="historyDropdown">
                    <div aria-hidden="true" className="c-menu_item__header">Recent</div>
                        <Dropdown.Item className="dropdown-item" href="#">Action</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">Another action</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">Something else here</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {/* Header Search */}
            <div className="header__search">
              
                
                <input type="text" placeholder="Search" />
                <SearchIcon/>
        
            </div>
            {/* Header Right */}
            <div className="header__right">
               
                <Dropdown className="history-dropdown dropdown">
                    <Dropdown.Toggle className="c-button-unstyled dropdown-toggle" id="historyDropdown" variant="success">
                    <HelpOutlineIcon/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu" aria-labelledby="historyDropdown">
                    <div aria-hidden="true" className="c-menu_item__header">Recent</div>
                        <Dropdown.Item className="dropdown-item" href="#">Action</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">Another action</Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" href="#">Something else here</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
