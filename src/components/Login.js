import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';



const Login = (props) => {
    

    const [creds, setCreds] = useState({
        email: '',
        password: ''
    })
    let history = useHistory();

    const host = "https://inoteapi.ravee.in";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });
        const json = await response.json();
        
        if (json.success) {
            // Save AUTH Token and redirect to Load Notes on Home
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('username', json.data['user'].name);
            props.showAlert('Hello, You are Logged In', 'success');
            history.push('/');
            
        } else {
            props.showAlert('Please use correct credentials', 'warning');
        }

    }


    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    
    // useEffect(() => {
    //     let isAuth = localStorage.getItem('token');
    //     if (isAuth !== '') {
    //       history.push('/')
    //     }else{
    //         history.push('/login')
    //     }
    //   }, [history])

    return (
        <div className='col-md-10 bg-main-color'>
            
            <div className="loginFormWrap p-5">
                <form className='col-12 col-md-6 m-auto' onSubmit={handleSubmit}>
                <h3 className="colTitle px-0 mb-3">Login to access your iNote Space.</h3>
                    <div className="mb-2">
                        <label htmlFor="usernameID" className="form-label">Email address / Username</label>
                        <input type="email" className="form-control rounded-0 bg-dark-main" value={creds.email} onChange={onChange} name='email' id="usernameID" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="passwordID" className="form-label">Password</label>
                        <input type="password" className="form-control rounded-0 bg-dark-main" value={creds.password} onChange={onChange} name='password' id="passwordID" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-bg-main-color rounded-0">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login