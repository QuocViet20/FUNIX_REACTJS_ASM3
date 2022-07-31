import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="bg-primary   ">
      <React.Fragment>
        <div className="container   ">
          <Navbar dark color="primary" expand="md">
            <NavbarToggler onClick={() => setNavOpen(!navOpen)} />
            <NavbarBrand>
              <NavLink to="/home">
                <img
                  src="assets/images/logo.png"
                  height="30"
                  width="41"
                  alt="Ristorante Con Fusion"
                />
              </NavLink>
            </NavbarBrand>
            <Collapse isOpen={navOpen} navbar>
              <Nav navbar>
                <NavItem className=" px-1 text-light">
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-users"></span> Nhân Viên
                  </NavLink>
                </NavItem>
                <NavItem className=" px-1 text-light">
                  <NavLink className="nav-link" to="/department">
                    <span className="fa fa-address-card"></span> Phòng Ban
                  </NavLink>
                </NavItem>
                <NavItem className=" px-1 text-light">
                  <NavLink className="nav-link" to="/salary">
                    <span className="fa fa-money"></span> Bảng Lương
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Header;
