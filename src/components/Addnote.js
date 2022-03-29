import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {


    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="headerNotes d-flex align-items-center">
                <h3 className='colTitle px-0 ms-2'>Add New Note</h3>
            </div>
            <div className="NotesBody">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Your Note Title</label>
                        <input type="text" className="form-control rounded-0 bg-dark-main" id="title" value={note.title} name='title' onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" rows={10} className="form-control rounded-0 bg-dark-main" id="description" value={note.description} name='description' onChange={onChange} minLength={5} required></textarea>
                        <p className='text-end'><small>{note.description.length} Characters</small></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control rounded-0 bg-dark-main" id="tag" value={note.tag} name='tag' onChange={onChange} />
                    </div>
                    <button disabled={note.description.length <= 5} type="submit" className="btn btn-primary btn-bg-main-color rounded-0" title={`${note.description.length <= 5 ? 'Add some text' : 'Add Note'}`} onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote