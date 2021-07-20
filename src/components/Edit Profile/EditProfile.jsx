import React, { useState } from 'react'
import '../../css/editprofile.css'
import InputSection from './InputSection'
function EditProfile() {
    const [saveChange, setSaveChange] = useState(false);
    const [toggle, setToggle] = useState(false)

    const handleSaveChange = () => {
        setSaveChange(true);
        setToggle(!toggle)
    }
    return(
        <div className="modal fade" id="editProfile" tabindex="-1" aria-labelledby="editProfile" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable c-modal-dialog modal-dialog-centered">
                <div className="modal-content c-modal-content">
                    <div className="c-modal__header">
                        <div className="c-modal__header__title">
                            <h1><div className="text">Edit your propfile</div></h1>
                        </div>
                    </div>

                    <div className="c-modal__body">
                        <div className="c-modal__body__section" style={{width: 700}}>
                            <div className="c-modal__body__columns">
                                <div className="col-sm-8 c-input-field">

                                    <InputSection
                                    label = "Display name"
                                    name = "displayName"
                                    type = "text"
                                    saveChange = {saveChange}
                                    toggle = {toggle}
                                    />
                                    <InputSection
                                    label = "What I do"
                                    name = "whatIDo"
                                    type = "text"
                                    saveChange = {saveChange}
                                    toggle = {toggle}
                                    />
                                    
                                </div>

                                <div className="col-sm-4 c-profile-photo-field">
                                    <InputSection
                                    label = "Profile photo"
                                    type = "photo"
                                    saveChange = {saveChange}  
                                    toggle = {toggle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="c-modal__footer">
                        <button className="btn btn-light cancel-button c-button--medium" data-bs-dismiss="modal">
                            Cancel
                        </button>

                        <button className="btn btn-success save-button c-button--medium" onClick={handleSaveChange}>
                            Save Changes
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
