import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRoomDetails } from "../../features/appSlice";
import { db } from "../../firebase";
import InputField from "./InputField";

function AboutTab({ roomName, roomDes, roomOwner, id }) {
  const [name, setName] = useState(roomName);
  const [des, setDes] = useState(roomDes ? roomDes : "");
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
      })
      .catch((err) => notification(err.message));
  };
  return (
    <div
      class="tab-pane fade show active channel-details__about"
      id="about"
      role="tabpanel"
      aria-labelledby="about-tab"
    >
      <div className="input-group">
        <InputField
          fieldLabel="Name"
          required={true}
          hyphenized={true}
          onChange={handleNameChange}
          value={name}
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

      <div className="text-group">
        <div className="text-field">
          <div className="text-field__title">Created by</div>
          <div className="text-field__content">
            {roomOwner ? roomOwner : "..."}
          </div>
        </div>

        <div className="text-field leave-button" role="button">
          <div className="text-field__title">Leave Channel</div>
        </div>
      </div>
    </div>
  );
}

export default AboutTab;
