import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
            BookingCare là Nền tảng Y tế Chăm sóc sức khỏe toàn diện kết nối người dùng đến với dịch vụ y tế - chăm sóc sức khỏe chất lượng, hiệu quả, tin cậy với trên 200 bệnh viện, phòng khám uy tín; trên 1.500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ y tế chất lượng cao. 
            BookingCare kết nối mạng lưới bác sĩ và cơ sở y tế chuyên khoa. Bệnh nhân dễ dàng lựa chọn đúng dịch vụ y tế với thông tin đã xác thực và đặt lịch nhanh chóng.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
