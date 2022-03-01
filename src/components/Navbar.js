import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let history = useHistory();
  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    history.push('/login');
  }

  useEffect(() => {
  }, [location]);
  return (
    <nav className="iNote_navbar">
      <div className="container-fluid p-0">
        <Link className="navbar-brand" to="/">iNote</Link>
        <div className="iNote_navbar-collapse">
          <ul className="iNote_navbar_Items">
            <li className="nav-item">
              <Link className={`iNote_nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`iNote_nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
          </ul>

          {!localStorage.getItem('token')?<div className="userAuth">
            <Link className='btn btn-primary btn-bg-main-color rounded-0 m-1' to="/login">LogIn</Link>
            <Link className='btn btn-primary btn-bg-main-color rounded-0 m-1' to="/signup">SignUp</Link>
          </div>:<div className="userAuth">
            <button className='btn btn-primary btn-bg-main-color rounded-0 m-1' onClick={handleLogOut}>Logout</button>
          </div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar