import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";


class section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSpecialty: [],
    };
  }
    render() {
      return(
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize specialty-child">
                  <div className="bg-image section-specialty"></div>
                  <div className="specialty-name text-center">Chuyên khoa 1</div>
                </div>
                <div className="section-customize specialty-child">
                  <div className="bg-image section-specialty"></div>
                  <div className="specialty-name text-center">Chuyên khoa 2</div>
                </div>
                <div className="section-customize specialty-child">
                  <div className="bg-image section-specialty"></div>
                  <div className="specialty-name text-center">Chuyên khoa 3</div>
                </div>
                <div className="section-customize specialty-child">
                  <div className="bg-image section-specialty"></div>
                  <div className="specialty-name text-center">Chuyên khoa 4</div>
                </div>
                <div className="section-customize specialty-child">
                  <div className="bg-image section-specialty"></div>
                  <div className="specialty-name text-center">Cơ xương khớp 5</div>
                </div>
                <div className="section-customize specialty-child">
                  <div className="bg-image section-specialty"></div>
                  <div className="specialty-name text-center">Cơ xương khớp 6</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(section);
