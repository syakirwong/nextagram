import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpForm = ({ toggleLogin, toggle, setIsDisabled }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const handleUsernameInput = (e) => {
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);

    const newDelay = setTimeout(() => {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          e.target.value
        )
      ) {
        setEmailValid(false);
      } else setEmailValid(true);
    }, 500);

    setDelay(newDelay);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    const newDelay = setTimeout(() => {
      if (e.target.value.length <= 6) {
        setPasswordValid(false);
      } else {
        setPasswordValid(true);
      }
    }, 500);

    setDelay(newDelay);
  };

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
    const newDelay = setTimeout(() => {
      if (e.target.value !== password) {
        setConfirmPasswordValid(false);
      } else {
        setConfirmPasswordValid(true);
      }
    }, 500);

    setDelay(newDelay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username: " + username);
    console.log("Email: " + email);
    console.log("Password: " + password);
    handleSignUp(username, email, password);
  };

  const handleSignUp = (username, email, password) => {
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/users/",
      data: {
        username: username,
        email: email,
        password: password,
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toggle();
      })
      .catch((error) => {
        error.response.data.message.forEach((message) => {
          toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        // so that we know what went wrong if the request failed
      });
  };

  const checkUsername = (newUsername) => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };

  const getPasswordProp = () => {
    if (!password.length) {
      return null;
    }

    if (passwordValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getPasswordFeedback = () => {
    if (!password.length) {
      return null;
    }

    if (passwordValid) {
      return <FormFeedback valid>Password accepted</FormFeedback>;
    } else {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }
  };

  const getConfirmPasswordProp = () => {
    if (!confirmPassword.length) {
      return null;
    }

    if (confirmPasswordValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getConfirmPasswordFeedback = () => {
    if (!confirmPassword.length) {
      return null;
    }

    if (confirmPasswordValid) {
      return <FormFeedback valid>Password accepted</FormFeedback>;
    } else {
      return (
        <FormFeedback invalid>
          Password does not match the original password
        </FormFeedback>
      );
    }
  };

  const getEmailProp = () => {
    if (!email.length) {
      return null;
    }

    if (emailValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getEmailFeedback = () => {
    if (!email.length) {
      return null;
    }

    if (emailValid) {
      return <FormFeedback valid>Email accepted</FormFeedback>;
    } else {
      return <FormFeedback invalid>Invalid email</FormFeedback>;
    }
  };

  useEffect(() => {
    if (
      username !== "" &&
      password !== "" &&
      email !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password, email, confirmPassword, setIsDisabled]);

  return (
    <Form id="signup-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder=""
          value={username}
          onChange={handleUsernameInput}
          {...getInputProp()}
        />
        {getFormFeedback()}
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="example@nextagram.com"
          value={email}
          onChange={handleEmailInput}
          {...getEmailProp()}
        />
        {getEmailFeedback()}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder=""
          value={password}
          onChange={handlePasswordInput}
          {...getPasswordProp()}
        />
        {getPasswordFeedback()}
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          name="confirm-password"
          id="confirmPassword"
          placeholder=""
          value={confirmPassword}
          onChange={handleConfirmPasswordInput}
          {...getConfirmPasswordProp()}
        />
        {getConfirmPasswordFeedback()}
      </FormGroup>
      <small>
        Already a member?
        <Link to="/" onClick={toggleLogin}>
          {" "}
          Log in here.
        </Link>
      </small>
    </Form>
  );
};

export default SignUpForm;
