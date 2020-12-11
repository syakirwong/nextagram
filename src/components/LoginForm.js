import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({
  toggleLogin,
  toggle,
  setIsDisabled,
  setLoggedIn,
  setLoggedInUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username: " + username);
    console.log("Password: " + password);
    handleLogin();
  };

  const handleLogin = () => {
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success(
          `${response.data.message} Welcome back ${response.data.user.username}!`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        localStorage.setItem("jwt", response.data.auth_token);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem(
          "profilepicture",
          response.data.user.profile_picture
        );

        setLoggedIn(true);
        setLoggedInUser([
          localStorage.getItem("username"),
          localStorage.getItem("profilepicture"),
        ]);

        toggle();
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // so that we know what went wrong if the request failed
      });
  };

  useEffect(() => {
    if (username !== "" && password !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password, setIsDisabled]);

  return (
    <Form id="login-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Username</Label>
        <Input
          type="text"
          name="username"
          id="exampleEmail"
          placeholder=""
          onChange={handleUsernameInput}
          value={username}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder=""
          onChange={handlePasswordInput}
          value={password}
        />
      </FormGroup>
      <small>
        New member?
        <Link to="/" onClick={toggleLogin}>
          {" "}
          Sign up here.
        </Link>
      </small>
    </Form>
  );
};

export default LoginForm;
