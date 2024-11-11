import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

import './MedicalFacility.scss'

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }


    render() {
      return(
        <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Tìm kiếm  </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize clinic-child">
                <div className="bg-image section-medical-facility"></div>
                <div className="clinic-name text-center">Bệnh viện 1</div>
              </div>
              <div className="section-customize clinic-child">
                <div className="bg-image section-medical-facility"></div>
                <div className="clinic-name text-center">Bệnh viện 2</div>
              </div>
              <div className="section-customize clinic-child">
                <div className="bg-image section-medical-facility"></div>
                <div className="clinic-name text-center">Bệnh viện 3</div>
              </div>
              <div className="section-customize clinic-child">
                <div className="bg-image section-medical-facility"></div>
                <div className="clinic-name text-center">Bệnh viện 4</div>
              </div>
              <div className="section-customize clinic-child">
                <div className="bg-image section-medical-facility"></div>
                <div className="clinic-name text-center">Bệnh viện 5</div>
              </div>
              <div className="section-customize clinic-child">
                <div className="bg-image section-medical-facility"></div>
                <div className="clinic-name text-center">Bệnh viện 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
