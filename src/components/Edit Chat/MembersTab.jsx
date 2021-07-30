import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Member from "./Member";
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
function MembersTab({roomMembers, roomOwner}) {
    const [users, loading] = useCollection(db.collection('users'));
    let membersList = [];
    users?.docs.map(doc => {
        if(roomMembers?.includes(doc.data().uid) ){
            membersList.push(doc.data());
        }
    })
  return (
    <div
      class="tab-pane fade channel-details__members"
      id="members"
      role="tabpanel"
      aria-labelledby="members-tab"
    >
      <div className="channel-details__members__header">
        <div className="form-group">
            <SearchIcon className="search-icon"/>
            <input type="text" className="form-control" placeholder="Find members" />
        </div>
      </div>

      <div className="channel-details__members__list">
        <div className="member" role="button">
            <div className = "member__info">
                <div className="member__avatar" ><PersonAddIcon/></div>
                <div className="member__name" ><strong>Add people</strong></div>
            </div>
        </div>
        {membersList.map(user => {
            return (
                <Member 
                user = {user}
                roomOwner = {roomOwner}
                />
            )
        })}
      </div>
    </div>
  );
}

export default MembersTab;
