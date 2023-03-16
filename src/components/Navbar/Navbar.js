import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm ">
        <div className="container ">
          <Link to={"/"} className="navbar-brand">
            <h3>
              <i className="pe-2 fa fa-phone-square text-warning" />
              Contact <span className="text-warning">Manager</span>
            </h3>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
