import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
// import { userLoginSuccess } from "../../store/actions";
import { toast } from "react-toastify";

import HomeHeader from "../HomePage/HomeHeader";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
        toast.error(this.state.errMessage);
      }
      if (data && data.errCode === 0) {
        toast.success("Đăng nhập thành công");
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
          toast.error(this.state.errMessage);
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      
      <div className="login-background">
          <HomeHeader isShowBanner={false} />
        <div className="login-container">

          <div className="login-content row">
            <div className="col-12 text-login">Đăng nhập</div>
            <div className="col-12 form-group login-input">
              <label>Tên đăng nhập:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên đăng nhập"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Mật khẩu:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            {/* <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div> */}
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12 section-forgot-signup">
              <span className="forgot-password"
              onClick={() => {
                this.props.history.push("/forgot-password");
              }}
              >Quên mật khẩu</span>
              <span
                className="sign-up"
                onClick={() => {
                  this.props.history.push("/sign-up");
                }}
              >
                Đăng ký
              </span>
            </div>
            {/* <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with:</span>
            </div> */}
            {/* <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-square facebook"></i>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
