import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

  const [creds, setCreds] = useState({
    name: '',
    email: '',
    password: '',
    Cpassword: ''
  })
  let history = useHistory();

  const host = "https://inoteapi.ravee.in";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, Cpassword } = creds;

    if (password !== Cpassword) {
      props.showAlert('Passwords do not match.', 'warning');
    } else {
      // make API call

      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save AUTH Token and redirect to Load Notes on Home
        localStorage.setItem('token', json.authToken);
        history.push('/');
        props.showAlert('Account Created Successfully', 'success');
      } else {
        props.showAlert('Please use Authentic and Unique Details to Register', 'warning');
      }
    }



  }


  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }


  // useEffect(() => {
  //   const isAuth = localStorage.getItem('token');
  //   if (isAuth !== '') {
  //     history.push('/')
  //   }else{
  //     history.push('/signup')
  // }
  // }, [history]);

  return (
    <div className='col-md-10 bg-main-color'>
      <div className="loginFormWrap p-5">
        <form className='col-12 col-md-6 m-auto' onSubmit={handleSubmit}>
          <h3 className="colTitle px-0 mb-3">Register and create your own iNote Space.</h3>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input type="text" className="form-control rounded-0 bg-dark-main" onChange={onChange} name='name' id="name" required />
          </div>
          <div className="mb-2">
            <label htmlFor="usernameID" className="form-label">Email address / Username</label>
            <input type="email" className="form-control rounded-0 bg-dark-main" onChange={onChange} name='email' id="usernameID" aria-describedby="emailHelp" required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-2">
            <label htmlFor="passwordID" className="form-label">Password</label>
            <input type="password" className="form-control rounded-0 bg-dark-main" onChange={onChange} name='password' id="passwordID" required minLength={5} />
          </div>
          <div className="mb-2">
            <label htmlFor="CpasswordID" className="form-label">Confirm Password</label>
            <input type="password" className="form-control rounded-0 bg-dark-main" onChange={onChange} name='Cpassword' id="CpasswordID" required minLength={5} />
          </div>
          <button type="submit" className="btn btn-primary btn-bg-main-color rounded-0">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup