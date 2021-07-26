import React from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
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


export default SidebarHeader
