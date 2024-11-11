import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";



class Specialty extends Component {
  constructor() {
    super();
  }
    render() {
      return(
        <div className="section-share section-specialty">
          <div className="section-container">
            speciality
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
