import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3">
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer">
                    <div className="NotesActions">
                        <button className='btn btn-sm btn-danger' onClick={()=>{deleteNote(note._id)}}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                        <button className='btn btn-sm btn-info' onClick={()=>{updateNote(note)}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem