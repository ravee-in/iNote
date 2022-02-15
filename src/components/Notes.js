import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';


function Notes() {

    const context = useContext(noteContext);
    const { notes, setNotes } = context;


    return (
        <div className="NotesFooter">
            <h3>Your Notes</h3>
            <div className="row">
                {notes.map((note) => {
                    return <Noteitem note={note} />;
                })}
            </div>

        </div>
    )
}

export default Notes