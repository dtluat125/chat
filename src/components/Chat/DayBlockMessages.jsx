import React from 'react'

function DayBlockMessages({time, messages}) {
    return (
        <div className = "day-block-messages__container">
        
            <div className="day-block-messages__divider">
                <div className="day-block-messages__divider-line"></div>
                <div className="day-block-messages__label">
                    {time.date+"/"+time.month+"/"+time.year}
                </div>
            </div>
            {messages?.map(doc => doc)}
        </div>
    )
}

export default DayBlockMessages
