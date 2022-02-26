import React, { useState } from "react";
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);


    // Get All notes
    const getAllNotes = async () => {

        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZThlYzhmNTI4ZjExYTVlYWU5YTk4In0sImlhdCI6MTY0NDA3ODQyMX0.lrvYUnVSYUOn0P9Un2NhM5DKGPbrM6zj4BnXY34Eg9E',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json()
        console.log(json);
        setNotes(json);
    }


    // Add a note
    const addNote = async (title, description, tag) => {

        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZThlYzhmNTI4ZjExYTVlYWU5YTk4In0sImlhdCI6MTY0NDA3ODQyMX0.lrvYUnVSYUOn0P9Un2NhM5DKGPbrM6zj4BnXY34Eg9E',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = {
            "_id": "6203efd81e31cb0e4246c009",
            "user": "61fe8ec8f528f11a5eae9a98",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-09T16:46:16.305Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {

        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZThlYzhmNTI4ZjExYTVlYWU5YTk4In0sImlhdCI6MTY0NDA3ODQyMX0.lrvYUnVSYUOn0P9Un2NhM5DKGPbrM6zj4BnXY34Eg9E',
                'Content-Type': 'application/json'
            }
        });
        const json = response.json();
        console.log(json);

        console.log(id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZThlYzhmNTI4ZjExYTVlYWU5YTk4In0sImlhdCI6MTY0NDA3ODQyMX0.lrvYUnVSYUOn0P9Un2NhM5DKGPbrM6zj4BnXY34Eg9E',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);


        let newNotes = JSON.parse(JSON.stringify(notes));

        // Client Side Edit
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }        
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;