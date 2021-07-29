import React from "react";
import "../../css/editchat.css";
import AboutTab from "./AboutTab";
import InputField from "./InputField";
function EditChat({ id, roomDetails }) {
    const roomName = roomDetails?.name;
    console.log(roomName)
    const roomDes = roomDetails?.des;
    const roomOwner = roomDetails?.roomOwner?.displayName;
  return (
    <div className="modal fade" id={'a'+id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content chat-details-modal">
          <div className="chat-details-modal__header c-modal__header">
            <h1># {roomDetails?.name}</h1>
          </div>
          <div className="chat-details-modal__tabs c-modal__content">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <span
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#about"
                  type="button"
                  role="tab"
                  aria-controls="about"
                  aria-selected="true"
                >
                  About
                </span>
              </li>
              <li class="nav-item" role="presentation">
                <span
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#members"
                  type="button"
                  role="tab"
                  aria-controls="members"
                  aria-selected="false"
                >
                  Members
                </span>
              </li>
              <li class="nav-item" role="presentation">
                <span
                  class="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#setting"
                  type="button"
                  role="tab"
                  aria-controls="setting"
                  aria-selected="false"
                >
                  Setting
                </span>
              </li>
            </ul>

            <div className="c-modal__content__inner">
              <div class="tab-content" id="myTabContent">
               <AboutTab
               roomName = {roomName}
               roomDes = {roomDes}
               roomOwner = {roomOwner}
               id = {id}
               />
                <div
                  class="tab-pane fade channel-details__members"
                  id="members"
                  role="tabpanel"
                  aria-labelledby="members-tab"
                >
                  Members
                </div>
                <div
                  class="tab-pane fade channel-details__setting"
                  id="setting"
                  role="tabpanel"
                  aria-labelledby="setting-tab"
                >
                  setting
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChat;
