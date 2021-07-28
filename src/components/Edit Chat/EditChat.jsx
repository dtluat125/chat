import React from 'react'

function EditChat({id, roomDetails}) {
    console.log(id)
    console.log(roomDetails)
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content chat-details-modal">
                    <div className="chat-details-modal__header">
                        <span># {roomDetails?.name}</span>
                    </div>
                    <div className="chat-details-modal__body"></div>
                </div>
            </div>
        </div>
    )
}

export default EditChat
