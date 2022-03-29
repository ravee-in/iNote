import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";
import { ImHome, ImFileText } from "react-icons/im";
import { MdLogin, MdAppRegistration, MdPersonPin } from "react-icons/md";

const Navbar = () => {
  let location = useLocation();
  let history = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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
              <Link className={`iNote_nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/"><ImHome /> Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`iNote_nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about"><ImFileText /> About</Link>
            </li>
          </ul>

          {!localStorage.getItem('token') ? <div className="userAuth">
            <Link className='btn btn-primary btn-bg-main-color rounded-0 text-start' to="/login"><MdLogin /> LogIn</Link>
            <Link className='btn btn-primary btn-bg-main-color rounded-0 text-start' to="/signup"><MdAppRegistration /> SignUp</Link>
          </div> : <div className="userAuth">
            <p className="mx-3 my-0 mt-md-5">Hello, {localStorage.getItem('username')}</p>
            <ul className="iNote_navbar_Items">
              <li className="nav-item">
                <Link className={`iNote_nav-link ${location.pathname === '/profile' ? 'active' : ''}`} aria-current="page" to="/profile"><MdPersonPin/> Profile</Link>
              </li>
            </ul>
            <button className='btn btn-primary btn-bg-main-color rounded-0 mx-3' onClick={handleLogOut}>Logout</button>
          </div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar