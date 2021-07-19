import React from 'react'
import '../../css/editprofile.css'
import InputSection from './InputSection'
function EditProfile() {
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
                                    label = "Full name"
                                    />
                                    <InputSection
                                    label = "Display name"
                                    />
                                    <InputSection
                                    label = "What I do"
                                    />
                                    
                                </div>

                                <div className="col-sm-4 c-profile-photo-field">
                                    this is side column
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
