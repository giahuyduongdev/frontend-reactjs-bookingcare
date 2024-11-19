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
              height="300px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <div className="content-right container-newspaper">
              <div className="content-right newspapaer">
                <a href="https://vnexpress.net/bookingcare-ra-mat-tro-ly-ai-4798819.html" target="_blank">
                  <img src="https://raw.githubusercontent.com/giahuyduongdev/sharing-host-files-bookingcare/refs/heads/main/about/vnexpress.png">
                  </img>
                </a>
              </div>
              <div class ="content-right newspapaer2">
                <a href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm" target="_blank">
                  <img src="https://raw.githubusercontent.com/giahuyduongdev/sharing-host-files-bookingcare/refs/heads/main/about/suckhoedoisong.png">
                  </img>
                </a>
              </div>
            </div>
            <div className="content-right container-newspaper">
              <div className="content-right newspapaer">
                <a href="https://vietnamnet.vn/nen-tang-dat-lich-kham-online-bookingcare-muon-tang-truong-nguoi-dung-gap-5-lan-nam-2017-i370270.html" target="_blank">
                  <img src="https://raw.githubusercontent.com/giahuyduongdev/sharing-host-files-bookingcare/refs/heads/main/about/logo-vnnet.jpg">
                  </img>
                </a>
              </div>
              <div className="content-right newspapaer2">
                <a href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" target="_blank">
                  <img src="https://raw.githubusercontent.com/giahuyduongdev/sharing-host-files-bookingcare/refs/heads/main/about/vtv1.png">
                  </img>
                </a>
              </div>
            </div>
            <div className="content-right container-newspaper">
              <div className="content-right newspapaer">
                <a href="https://vtcnews.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html" target="_blank">
                  <img src="https://raw.githubusercontent.com/giahuyduongdev/sharing-host-files-bookingcare/refs/heads/main/about/vtcnewslogosvg.png">
                  </img>
                </a>
              </div>
              <div className="content-right newspapaer2">
                <a href="https://video.vnexpress.net/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html" target="_blank">
                  <img src="https://raw.githubusercontent.com/giahuyduongdev/sharing-host-files-bookingcare/refs/heads/main/about/vnexpress.png">
                  </img>
                </a>
              </div>
            </div>
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
