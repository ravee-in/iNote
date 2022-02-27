import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  return (
    <nav className="iNote_navbar">
      <div className="container-fluid p-0">
        <Link className="navbar-brand" to="/">iNote</Link>
        <div className="iNote_navbar-collapse">
          <ul className="iNote_navbar_Items">
            <li className="nav-item">
              <Link className={`iNote_nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`iNote_nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar