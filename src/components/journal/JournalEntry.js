import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://wallpaperaccess.com/full/21593.jpg)'
                }}
                className="journal__entry-picture">

            </div>

            <div className="journal__entry-body">

                <p className="journal__entry-title">
                    Un Nuevo dìa
                </p>

                <p className="journal__entry-content">
                    Elit qui consectetur ad magna enim.
                </p>

            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
