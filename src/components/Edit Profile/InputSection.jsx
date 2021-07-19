import React from 'react'

function InputSection(props) {
    return (
        <div className = 'input-container'>
            <label htmlFor="" className="form-label">{props.label}</label>
            <input type="text" className="form-control"/>
        </div>
    )
}

export default InputSection
