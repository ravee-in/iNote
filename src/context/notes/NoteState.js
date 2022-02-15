import React, { useState } from "react";
import NoteContext from "./noteContext"

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6203efbd1e31cb0e4246cb0a",
            "user": "61fe8ec8f528f11a5eae9a98",
            "title": "New note title",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "tag": "personal",
            "date": "2022-02-09T16:45:49.555Z",
            "__v": 0
        },
        {
            "_id": "6203efd21e31cb0e4246cb0d",
            "user": "61fe8ec8f528f11a5eae9a98",
            "title": "New note title",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "tag": "personal",
            "date": "2022-02-09T16:46:10.733Z",
            "__v": 0
        },
        {
            "_id": "6203efd61e31cb0e4246cb0f",
            "user": "61fe8ec8f528f11a5eae9a98",
            "title": "New note title",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "tag": "personal",
            "date": "2022-02-09T16:46:14.735Z",
            "__v": 0
        },
        {
            "_id": "6203efd81e31cb0e4246cb11",
            "user": "61fe8ec8f528f11a5eae9a98",
            "title": "New note title",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "tag": "personal",
            "date": "2022-02-09T16:46:16.305Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;