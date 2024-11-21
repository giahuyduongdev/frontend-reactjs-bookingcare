import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postConfirmNewAccountEmail } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./ConfirmNewAccount.scss";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let tokenUser  = urlParams.get("tokenUser");
      let emailUser  = urlParams.get("email");;
      console.log(tokenUser);
      console.log(emailUser)
      let res = await postConfirmNewAccountEmail({
        tokenUser: tokenUser,
        email: emailUser,
      });
      if (res && res.errCode === 0) {
        console.log('ok')
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="infor-booking">
                  Xác nhận tài khoản thành công!
                </div>
              ) : (
                <div className="infor-booking">
                  Tài khoản không tồn tại hoặc đã được xác nhận!
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
