import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const { note, updateNote, viewNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const date = new Date(note.date);

    return (
        <div className="col-md-12">
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer">
                    <div className="NotesActions">
                        <button className='btn btn-sm-iNote' onClick={() => { viewNote(note) }} title="View"><i className="fa fa-eye" aria-hidden="true"></i></button>
                        <button className='btn btn-sm-iNote' onClick={() => { updateNote(note) }} title="Edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        <button className='btn btn-sm-iNote' onClick={() => { deleteNote(note._id) }} title="Delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                    <span className='ms-5 text-greyLight'><small>{date.toLocaleString()}</small></span>
                </div>
            </div>
        </div>
    )
}

export default Noteitem