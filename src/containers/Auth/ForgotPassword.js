import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.scss";

import { postUserForgotPassword } from "../../services/userService";
import { toast } from "react-toastify";

import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isShowLoading, setIsShowLoading] = useState("");

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const handleForgotPassword = async () => {
    // alert(email.trim().length);
    // alert(email.length);
    setIsShowLoading(true);
    if (email.trim().length === 0) {
      toast.error("Email input empty!");
      return;
    }
    let res = await postUserForgotPassword({
      email: email.trim(),
    });
    if (res && res.errCode === 0) {
      toast.success("Send email to retrieve password succeed!");
      setIsShowLoading(false);
    } else {
      toast.error("User's not found, please retype email!");
      setIsShowLoading(false);
    }
  };
  return (
    <>
          <LoadingOverlay
        active={isShowLoading}
        spinner={<BounceLoader color={"#86e7d4"} size={60} />}
      ></LoadingOverlay>
      <div className="login-background">
        <div className="forgot-password-container">
          <div className="login-content row">
            <div className="col-12 text-login">Forgot Password</div>
            <div className="col-12 form-group login-input">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email to retrieve password"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  handleForgotPassword();
                }}
              >
                Retrieve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
