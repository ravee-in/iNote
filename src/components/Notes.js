import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';


function Notes() {

    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;

    const [note, setNote] = useState({
        id:"",
        etitle:"",
        edescription:"",
        etag:"Default"
    })

    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title, 
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) =>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        e.preventDefault();
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Addnote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editing Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Your Note Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="NotesFooter">
                <h3>Your Notes</h3>
                <div className="row">
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes