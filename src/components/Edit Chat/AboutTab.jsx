import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectRoomDetails,
  selectRoomId,
  selectUser,
  setIsModalOpen,
} from "../../features/appSlice";
import { db } from "../../firebase";
import InputField from "./InputField";
import $ from "jquery";
import { useDispatch } from "react-redux";

function AboutTab({
  roomName,
  roomDes,
  roomOwner,
  id,
  isPrivate,
  roomMembers,
}) {
  const dispatch = useDispatch()
  const [name, setName] = useState(roomName);
  const [des, setDes] = useState(roomDes ? roomDes : "");
  const defaultRoomId = "CcfrQCURBPLWpn6lj0k8";
  useEffect(() => {
    setName(roomName);
    setDes(roomDes ? roomDes : "");
  }, [roomName, roomDes]);
  const [notification, setNotification] = useState("");
  const [changed, setChanged] = useState(false);
  const handleNameChange = (e) => {
    var content = e.target.value;
    var hyphenizedContent = content.replace(/\s/g, "-");
    setName(hyphenizedContent);
  };

  const handleDesChange = (e) => {
    var content = e.target.value;
    setDes(content);
  };
  const saveChange = () => {
    if (name === "") {
      setNotification("Name must not be left empty!, try again");
      setChanged(false);
      setName(roomName);
      return;
    }
    db.collection("room")
      .doc(id)
      .update({
        name: name,
        des: des,
      })
      .then(() => {
        setChanged(true);
        setNotification("Channel was updated successfully!");
        setTimeout(() => {
          setNotification("")
        }, 2000)
      })
      .catch((err) => notification(err.message));
  };

  
  // Leave channel Handle
  const user = useSelector(selectUser);
  const [alert, setAlert] = useState(false);
  const [leave, setLeave] = useState(false);
  const [left, setLeft] = useState(false);
  const openAlert = () => {
    setAlert(true);
  };
  const closeAlert = () => {
    setAlert(false);
  };
  const leaveChannel = () => {
    setLeave(true);
  };
  const roomId = useSelector(selectRoomId);
  var membersArr = roomMembers?.slice();
  var index = membersArr?.indexOf(user.uid);
  membersArr?.splice(index, 1);
  useEffect(() => {
    console.log(leave);
    if (leave) {
      db.collection("room")
        .doc(roomId)
        .update({
          members: membersArr ? membersArr : [],
        })
        .then(() => {
          dispatch(setIsModalOpen({
            isModalOpen: false
          }))
        })
        .catch((err) => alert(err.message));
      console.log("success");
    }
  }, [leave]);

// Direct room
const directUserId = useSelector(select)
  return (
    <div
      class="tab-pane fade show active channel-details__about"
      id="about"
      role="tabpanel"
      aria-labelledby="about-tab"
    >
      {roomId&&<>
      <div className="input-group c-tab-group">
        <InputField
          fieldLabel="Name"
          required={true}
          hyphenized={true}
          onChange={handleNameChange}
          value={name}
          disabled = {id===defaultRoomId}
        />
        <InputField
          fieldLabel="Description"
          onChange={handleDesChange}
          value={des}
        />
        <br />
        <div className="input-group__footer">
          <button
            className="btn btn-success c-button--medium"
            onClick={saveChange}
          >
            Save
          </button>
          {changed ? (
            <div className="notification badge bg-success">{notification}</div>
          ) : (
            <div className="notification badge bg-warning">{notification}</div>
          )}
        </div>
      </div>

      <div className="text-group c-tab-group">
        <div className="text-field">
          <div className="text-field__title">Created by</div>
          <div className="text-field__content">
            {roomOwner ? roomOwner : "..."}
          </div>
        </div>

        <div className="text-field leave-button" role="button">
          <div className="text-field__title" onClick={openAlert}>
            Leave Channel
          </div>
        </div>
      </div>
      </>}
      {}
      {alert && (
        <div className="c-tab-group alert">
          <span>
            Do you want to leave channel?{" "}
            {isPrivate && (
              <>
                This is a <strong>private</strong> channel so it cannot be
                accessed by outsiders.
              </>
            )}
          </span>
          <div className="buttons-group">
            <button className="btn btn-secondary" onClick={closeAlert}>
              Cancel
            </button>
            <button className="btn btn-danger" data-bs-dismiss="modal" data-bs-target={"a" + id} onClick={leaveChannel}>
              Leave
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutTab;
