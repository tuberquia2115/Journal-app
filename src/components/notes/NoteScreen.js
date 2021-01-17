import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main_content">
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="some awesome title"
                    autoComplete="off"
                    className="notes__title-input"
                />

                <textarea
                placeholder="what happened today"
                className="notes__textarea"
                >

                </textarea>

                <div className="notes__image">
                <img
                    src="https://i.pinimg.com/originals/ec/ee/21/ecee2106a78a527bf97398d028dfeab6.jpg"
                    alt="anime"
                />

                </div>
            </div>
        </div>
    )
}
