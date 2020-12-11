import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const ModalComponent = ({
  modal,
  toggle,
  isLogin,
  toggleLogin,
  setLoggedIn,
  setLoggedInUser,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  let eventName = isLogin ? "Login" : "Sign Up";
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{eventName}</ModalHeader>
        <ModalBody>
          {isLogin ? (
            <LoginForm
              toggleLogin={toggleLogin}
              toggle={toggle}
              setIsDisabled={setIsDisabled}
              setLoggedIn={setLoggedIn}
              setLoggedInUser={setLoggedInUser}
            ></LoginForm>
          ) : (
            <SignUpForm
              toggleLogin={toggleLogin}
              toggle={toggle}
              setIsDisabled={setIsDisabled}
            ></SignUpForm>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            id="submit-form"
            form={isLogin ? "login-form" : "signup-form"}
            disabled={isDisabled}
            key="submit"
            color="primary"
          >
            {eventName}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;
