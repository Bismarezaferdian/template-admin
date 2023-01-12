import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux.js/apiCall";
import "./index.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetch, error } = useSelector((state) => state.user);

  console.log(isFetch);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="container">
      {isFetch && <h1>is loading ...</h1>}
      <div className="loginWrapp">
        <h3>login </h3>
        <div className="formWrapp">
          <TextField
            // id="filled-basic"
            type="text"
            label="EMAIL"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            // id="filled-basic"
            label="PASSWORD"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="buttonLogin" onClick={handleClick}>
          Login
        </button>
        {error && <h1>wrong password & userName</h1>}
      </div>
    </div>
  );
};

export default Login;
