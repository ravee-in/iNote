import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../context/user/userContext';

function Profile() {

    const context = useContext(userContext);
    let history = useHistory();
    const { userInfo, getUserInfo } = context;


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserInfo();
        }else{
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])


  return (
    <>
    <div className='col-md-10'>
      <div className="profileView text-center">
        <h2 className='colTitle px-0'>Your Personal Info</h2>
        <p className='m-0'>Name: {userInfo.name}</p>
        <p className='m-0'>Email: {userInfo.email}</p>
      </div>
    </div>
    </>
  )
}

export default Profile