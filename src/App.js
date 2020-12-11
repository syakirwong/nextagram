import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import HomePage from "./page/Homepage";
import ProfilePage from "./page/ProfilePage";
import MyProfile from "./page/MyProfilePage";
import NavBar from "./components/Navbar";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UploadImage from "./page/UploadImage";

function App() {
  const [users, updateUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );
  const [loggedInUser, setLoggedInUser] = useState([
    localStorage.getItem("username"),
    localStorage.getItem("profilepicture"),
  ]);
  // console.log(loggedInUser);

  useEffect(() => {
    axios.get("https://insta.nextacademy.com/api/v1/users").then((response) => {
      // console.log(response.data);
      updateUsers(response.data);
    });
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <NavBar
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setLoggedInUser={setLoggedInUser}
        loggedInUser={loggedInUser}
      ></NavBar>
      <Route exact path="/">
        <HomePage users={users}></HomePage>
      </Route>
      <Route path="/users/:id">
        <ProfilePage></ProfilePage>
      </Route>
      <Route exact path="/profile">
        <MyProfile jwt={localStorage.getItem("jwt")}></MyProfile>
      </Route>
      <Route path="/profile/:username/uploadimage">
        <UploadImage></UploadImage>
      </Route>
    </>
  );
}

export default App;
