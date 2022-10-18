import React, { useState } from "react";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { userInfo } from "../../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

const LogInForm = () => {
  //   useState settings
  
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");

  // form function
   const handleSubmit = (e) => {
    e.preventDefault();
   
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
         if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
         } 
         else{
            window.location = "/";
         }
      })
      .catch((err) => {});
   
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  // Form Layout
  return (
    <form action="" onSubmit={handleSubmit} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={onInputChange}
        value={email}
      />
      <div className="email error"> </div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={onInputChange}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
      
    </form>
  );
};

export default LogInForm;
