import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Signup.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
// import { userLoginSuccess } from "../../store/actions";

import { registerNewUserService, postConfirmNewAccount } from "../../services/userService";

import { toast } from "react-toastify";
import BounceLoader from "react-spinners/BounceLoader";
import LoadingOverlay from "react-loading-overlay";
import DatePicker from "../../components/Input/DatePicker";
import { Phone } from "@material-ui/icons";
import Select from "react-select";
import { LANGUAGES } from "../../utils";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      birthday: "",
      isShowPassword: false,
      errMessage: "",
      selectedGender: "",
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
  }
  

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddNewUser();
    }
  };

  createNewUser = async () => {
    let isValid = this.checkValidateInput();
    if(isValid === true){
      this.setState({ isShowLoading: true });
    try {
      let response = await registerNewUserService({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        birthday: this.state.birthday,
        gender: this.state.selectedGender.value

      });
      if (response && response.errCode !== 0) {
        toast.error(response.errMessage);
        this.setState({ isShowLoading: false });
      } else {
        toast.success("User created, pls check your email to authenticate your account!");
        this.setState({ isShowLoading: false });
        this.setState({
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          phonenumber: "",
          selectedGender: "",
          isShowPassword: false,
        });
        this.props.history.push("/login");
        await postConfirmNewAccount(response.data);
        
        
      }
    } catch (e) {
      console.log(e);
    }
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address", "phonenumber", "birthday", "selectedGender"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        // alert("Missing parameter: " + arrInput[i]);
        toast.error("Missing: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create modal
      this.createNewUser(this.state); //can kiem tra lai cac input trong state cho fit
    }
  };

  render() {
    console.log(this.state.selectedGender)
    return (
      <div className="login-background">
              <LoadingOverlay
        active={this.state.isShowLoading}
        spinner={<BounceLoader color={"#86e7d4"} size={60} />}
      ></LoadingOverlay>
        <div className="signup-container">
          <div className="login-content row">
            <div className="col-12 text-login">Sign Up</div>
            <div className="col-12 form-group login-input">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
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
            <div className="col-12 form-group login-input">
              <label>Firstname:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your firstname"
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Lastname:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your lastname"
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Address:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Address"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Phonenumber:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Phonenumber"
                value={this.state.phonenumber}
                onChange={(event) => this.handleOnChangeInput(event, "phonenumber")}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Birthday:</label>
              <DatePicker
                    onChange={this.handleOnChangeDatePicker}
                    className="form-control"
                    value={this.state.birthday}
                  />
            </div>
            <div className="col-12 form-group login-input">
              <label>Gender:</label>
              <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
            </div>
            {/* <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div> */}
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.createNewUser();
                }}
              >
                Sign Up
              </button>
            </div>
            {/* <div className="col-12 section-forgot-signup">
              <span className="forgot-password">Forgot your password</span>
              <span className="sign-up">Sign up</span>
            </div> */}
            {/* <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Signup with:</span>
            </div>
            <div className="col-12 social-login">
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
  return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
