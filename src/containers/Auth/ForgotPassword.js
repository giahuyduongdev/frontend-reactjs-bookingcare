import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.scss";

import { postUserForgotPassword } from "../../services/userService";
import { toast } from "react-toastify";

import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

import HomeHeader from "../HomePage/HomeHeader";



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
      setIsShowLoading(false);
      toast.error("Chưa nhập email");
      return;
    }
    let res = await postUserForgotPassword({
      email: email.trim(),
    });
    if (res && res.errCode === 0) {
      toast.success("Gửi email cập nhật mật khẩu thành công");
      setIsShowLoading(false);
    } else {
      setIsShowLoading(false);
      toast.error("Người dùng không tồn tại, vui lòng nhập lại email");
    }
  };
  return (
    <>
          <LoadingOverlay
        active={isShowLoading}
        spinner={<BounceLoader color={"#86e7d4"} size={60} />}
      ></LoadingOverlay>
      <div className="login-background">
      <HomeHeader isShowBanner={false} />
        <div className="forgot-password-container">
          <div className="login-content row">
            <div className="col-12 text-login">Quên Mật Khẩu</div>
            <div className="col-12 form-group login-input">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập email của bạn để lấy lại mật khẩu"
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
