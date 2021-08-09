import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import "../../css/createchannel.css";
import { selectUser } from "../../features/appSlice";
import { db } from "../../firebase";
import SmallLoader from "../SmallLoader";
import InputField from "./InputField";
import firebase from "firebase";
function CreateChannel() {
  const user = useSelector(selectUser);
  const [users, loading] = useCollection(db.collection("users"));
  let uids = [];
  users?.docs.map((doc) => uids.push(doc.data().uid));
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [notification, setNotification] = useState("");
  const [added, setAdded] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSwitch = () => {
    setChecked(!checked);
  };

  const handleNameChange = (e) => {
    var content = e.target.value;
    var hyphenizedContent = content.replace(/\s/g, "-");
    setName(hyphenizedContent);
  };

  const handleDesChange = (e) => {
    var content = e.target.value;
    setDes(content);
  };

  const addChannel = async () => {
    if (!loading) {
      const isExist = await checkExist();
      if (name === "") {
        setNotification("Please enter the channel name");
        return;
      }
      if (isExist === false) {
        db.collection("room")
          .add({
            name: name,
            des: des,
            isPrivate: checked,
            members: checked ? [user.uid] : uids,
            roomOwner: user,
          })
          .then((doc) => {
            let input = doc.data().des;
            db.collection("room")
              .doc(doc.id)
              .collection("messages")
              .add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: `You’ve found the #${doc.data().name} channel,`,
                userImage:
                  "https://icon-library.com/images/comment-bubble-icon-png/comment-bubble-icon-png-3.jpg",
              });
            setNotification("Room was created successfully");
            setAdded(true);
          })
          .catch((err) => {
            setNotification(err.message);
            setAdded(false);
          });
      } else setNotification("Channel exist!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const checkExist = () => {
    if (!loading) {
      let doc = users.docs.find((elem) => elem.data().name === name);
      if (doc) return true;
      else return false;
    }
  };
  return (
    <div
      className="modal fade"
      id="createChannel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content create-channel">
          {loading ? (
            <SmallLoader />
          ) : (
            <>
              <div className="create-channel__header c-modal__header">
                <h1>Create a channel</h1>
              </div>
              <div className="create-channel__body">
                <div className="overview c-gray-text">
                  Channels are where your team communicates. They’re best when
                  organized around a topic — #marketing, for example.
                </div>

                <br />
                <InputField
                  fieldLabel="Name"
                  required={true}
                  hyphenized={true}
                  toggle={toggle}
                  onChange={handleNameChange}
                  value={name}
                />
                <InputField
                  fieldLabel="Description"
                  toggle={toggle}
                  onChange={handleDesChange}
                  value={des}
                />
                <div className="c-gray-text">
                  <small>What is this channel about(optional)</small>
                </div>
                <br />
                <div className="channel-type form-check form-switch">
                  <label
                    htmlFor="switch-button"
                    className="channel-type-des form-check-label"
                  >
                    <div className="channel-type-des__title">
                      <strong>Make private</strong>
                    </div>
                    <div className="channel-type-des__body c-gray-text">
                      {checked && (
                        <>
                          <strong>
                            Private Channel cannot be accessed from outsiders
                          </strong>
                          .
                        </>
                      )}
                      {!checked &&
                        "When a channel is set to private, it can only be viewed or joined by invitation."}
                    </div>
                  </label>

                  <div className="switch-button">
                    <input
                      type="checkbox"
                      name="switch-button"
                      role="switch"
                      className="form-check-input"
                      id="switch-button"
                      onChange={handleSwitch}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="create-channel__footer">
                <button
                  className="btn btn-success c-button--medium"
                  onClick={addChannel}
                >
                  Create
                </button>
                {added ? (
                  <div className="notification badge bg-success">
                    {notification}
                  </div>
                ) : (
                  <div className="notification badge bg-warning">
                    {notification}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateChannel;
