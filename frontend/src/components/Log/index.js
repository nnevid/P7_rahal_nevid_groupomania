import React, {useState} from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";


const Log = ( props) => {
  const [logInModal, setLogInModal] = useState(props.login);
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
      setLogInModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLogInModal(true);
    }
  };
  return (
    <section className="connection-form">
      
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            Inscription
          </li>
          <li onClick={handleModals} id="login"
          className={logInModal ? "active-btn" : null}>
            Connexion
          </li>
         
        </ul>
        {signUpModal && <SignUpForm />}
        {logInModal && <LogInForm />}
      
      </div>
    </section>
  );
};

export default Log;
