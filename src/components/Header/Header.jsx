import React, { useEffect } from 'react';
import "../../css/header.css";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Dropdown } from 'react-bootstrap';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { auth, db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { reset, saveUserInfo, selectDocId, selectUser } from '../../features/appSlice';


function Header() {
    const docUserId = useSelector(selectDocId);
    
    const userInf = useSelector(selectUser);
    const [users , loading] = useCollection(db.collection('users'))
    const user = users?.docs.find(elem => elem.data().uid === userInf.uid)
    
    const dispatch = useDispatch();
    const logOut= async() => {
        await auth.signOut().then(() => {
        }).catch(error => alert(error.message));
        dispatch(reset({
            initState: null,
        }));
    }
   

    const displayName = user?.data().displayName;
    const photoURL = user?.data().photoURL;
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
                
                <Dropdown className="user-dropdown dropdown">
                    <Dropdown.Toggle className="c-button-unstyled dropdown-toggle" id="historyDropdown" variant="success">
                    <span className="user-avatar">
                        <img src={photoURL} alt="" />
                    </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu" aria-labelledby="historyDropdown">
                    
                        <div className="dropdown-item main-menu__user" >
                            <div className="main-menu__user__avatar">
                            <img src={photoURL} alt="" />
                            </div>
                            <div className="main-menu__user__details">
                                <div className="main-menu__user__name">
                                    {displayName}
                                </div>
                                <span className="main-menu__user__status">
                                    <FiberManualRecordIcon style={{fontSize: "small"}}/>
                                    Active
                                </span>
                            </div>
                        </div>
                        <div className="dropdown-item" onClick={logOut} >Sign Out</div>
                        <div className="dropdown-item" data-bs-toggle="modal" data-bs-target="#editProfile">
                            Edit Profile
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            </div>

            
        </div>
    )
}






export default Header
