import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

import { postConfirmNewAccountEmail } from "../../services/userService";
import { toast } from "react-toastify";
import "./ConfirmNewAccount.scss";

const ConfirmNewAccount = () => {
  let history = useHistory();
  const [values, setValues] = React.useState({
    email: "",
  });

  useEffect(() => {
    document.title = "Retrieve Password";
    let params = new URLSearchParams(window.location.search);
    if (params.has("tokenUser") && params.has("email")) {
      let tokenUser = params.get("tokenUser");
      let emailUser = params.get("email");
      setValues({ ...values, email: emailUser });
    }
  }, []);


  const handleConfirm = async () => {
    let params = new URLSearchParams(window.location.search);
    if (params.has("tokenUser") && params.has("email")) {
      let tokenUser = params.get("tokenUser");
      let emailUser = params.get("email");
      let res = await postConfirmNewAccountEmail({
        tokenUser: tokenUser,
        email: emailUser,
      })
      console.log(emailUser)
      console.log(tokenUser)
      if (res && res.errCode === 0) {
        toast.success("Authicate your account succeed!");
        history.push("/login");
      } else {
        toast.error("Authicate your account error!");
      }
    }else{
      toast.error("Missing input!")
    }
  };
  return (
    <>
<div className='strip'></div>
<div className='container'>
  <div className='positive'>
    <div className='far fa-smile'></div>
    <div className='message'><span>Well Done!</span> Please verify your account.</div>
    <a href='#' className='button ok' onClick={() => {
                  handleConfirm();
                }}>Cofirm</a>
  </div>
</div>
    </>
  );
};
export default ConfirmNewAccount;
