import { useState } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

import Modal from "./Modal";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";

const NavBar = ({ setLoggedIn, loggedIn, setLoggedInUser, loggedInUser }) => {
  const [modal, showModal] = useState(false);
  const [isLogin, setLogin] = useState(true);
  const toggle = () => showModal(!modal);
  const toggleLogin = () => {
    if (isLogin) setLogin(false);
    else {
      setLogin(true);
    }
  };

  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("profilepicture");
    toast.info("User succesfully logged out!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/");
    setLoggedIn(false);
  };

  const showLoggedInNav = () => {
    if (loggedIn) {
      return (
        <>
          <Navbar.Toggle aria-controls="loggedin-navbar-nav" />
          <Navbar.Collapse id="loggedin-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Type username"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav.Link href="#home">Users</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="d-flex align-items-center"
              >
                <img
                  src={loggedInUser[1]}
                  alt={loggedInUser[1]}
                  className="border rounded-circle"
                  style={{ height: "25px" }}
                ></img>
                <Nav.Link style={{ color: "black" }}>
                  {loggedInUser[0]}
                </Nav.Link>
              </Dropdown.Toggle>

              <Dropdown.Menu className="text-center">
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link>Edit Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </>
      );
    } else {
      return (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Type username"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav.Link href="#home">Users</Nav.Link>
            <Nav.Link
              onClick={() => {
                setLogin(true);
                toggle();
              }}
            >
              Sign In
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setLogin(false);
                toggle();
              }}
            >
              Sign Up
            </Nav.Link>
          </Navbar.Collapse>
        </>
      );
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <a
            style={{ fontSize: "20px" }}
            className="navbar-brand ml-1"
            href="/"
          >
            <i className="fab fa-instagram fa-lg p-1 ml-1"></i>
            Nextagram
          </a>
        </Navbar.Brand>
        {showLoggedInNav()}
      </Navbar>
      <Modal
        modal={modal}
        toggle={toggle}
        isLogin={isLogin}
        toggleLogin={toggleLogin}
        setLoggedIn={setLoggedIn}
        setLoggedInUser={setLoggedInUser}
      ></Modal>
    </>
  );
};

export default NavBar;
