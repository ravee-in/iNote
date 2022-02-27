import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';


function Notes() {

    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;

    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
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

    // /* View Selected Note */ 
    const [noteView, setNoteView] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    })

    const [addForm, setAddForm] = useState(true);
    const viewNote = (currentNote) => {
        setAddForm(null);
        setNoteView({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    }
    // /* View Selected Note */ 

    const addNoteForm = () => {
        setAddForm(true);
        setNoteView({
            id: '',
            etitle: '',
            edescription: '',
            etag: ''
        });
    }



    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        e.preventDefault();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className="col-md-4 bg-main-color">
                <div className="NotesWrap">
                    <div className="NotesWRap_Header">
                        <h3 className='colTitle colTitle px-0'>Your Notes</h3>
                        <button className='btn btn-sm-iNote' onClick={() => { addNoteForm() }} title="Add New Note"><i className="fa fa-plus" aria-hidden="true"></i></button>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className='m-0'>
                                {notes.length === 0 && "No Notes to Display."}
                            </p>
                        </div>
                        {notes.map((note) => {
                            return <Noteitem key={note._id} updateNote={updateNote} viewNote={viewNote} note={note} />;
                        })}
                    </div>
                </div>
            </div>
            <div className="col-md-6 bg-main-color">
                {addForm ? <Addnote /> : null}

                {/* View Selected Note */}
                <div className='noteView'>
                    <h3 className='colTitle px-0'>{noteView.etitle}</h3>
                    <p>
                        {noteView.edescription}
                    </p>
                    <p><small>{noteView.etag}</small></p>
                </div>
                {/* View Selected Note */}
            </div>



            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-main-color rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editing Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Your Note Title</label>
                                    <input type="text" className="form-control rounded-0 bg-dark-main" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" rows={5} className="form-control rounded-0 bg-dark-main" id="edescription" name='edescription' value={note.edescription} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control rounded-0 bg-dark-main" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary btn-bg-main-color" onClick={handleClick}>Update</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Notes