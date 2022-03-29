import React, { useState } from "react";
import UserContext from "./userContext"

const UserState = (props) => {
    const host = "https://inoteapi.ravee.in";
    // const notesInitial = []
    // const [notes, setNotes] = useState(notesInitial);
    const [userInfo, setUserInfo] = useState([]);


    // Get All User Specific notes
    const getUserInfo = async () => {

        // API CALL
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        const user = await response.json()
        setUserInfo(user);
    }

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, getUserInfo}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;