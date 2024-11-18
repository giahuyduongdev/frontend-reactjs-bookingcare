import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ConfirmNewAccount.scss";

const ConfirmNewAccount = () => {
  let history = useHistory();

  useEffect(() => {
    document.title = "CONFIRM ACCOUNT";
  }, []);


  const handleConfirm = async () => {
    history.push("/login");
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
