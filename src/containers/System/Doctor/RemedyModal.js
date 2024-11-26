import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
      isShowChooseOtherFile: false,
      isShowBtnChooseOtherFile: true,
    };
  }

  async componentDidMount() {
    if (
      this.props.dataModal &&
      this.props.dataModal.imageRemedy &&
      this.props.dataModal.email
    ) {
      let base64data = new Buffer(
        this.props.dataModal.imageRemedy,
        "base64"
      ).toString("binary");
      this.setState({
        imgBase64: base64data,
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModal.imageRemedy !== prevProps.dataModal.imageRemedy) {
      if (
        this.props.dataModal &&
        this.props.dataModal.imageRemedy &&
        this.props.dataModal.email
      ) {
        let base64dataImage = new Buffer(
          this.props.dataModal.imageRemedy,
          "base64"
        ).toString("binary");
        this.setState({
          imgBase64: base64dataImage,
          email: this.props.dataModal.email,
          isShowChooseOtherFile: false,
          isShowBtnChooseOtherFile: true,
        });
      }
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("base64", base64);

      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  handleBtnChooseOtherFile = () => {
    this.setState({
      isShowChooseOtherFile: !this.state.isShowChooseOtherFile,
      isShowBtnChooseOtherFile: !this.state.isShowBtnChooseOtherFile,
    });
  };
  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeRemedyModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email bệnh nhân</label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn file đơn thuốc</label>
              {this.props.dataModal.imageRemedy &&
                this.state.isShowBtnChooseOtherFile === true && (
                  <label>Đã có file đơn thuốc tạo trước đó</label>
                )}
              {this.props.dataModal.imageRemedy &&
                this.state.isShowBtnChooseOtherFile === true && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleBtnChooseOtherFile()}
                  >
                    Choose other file
                  </button>
                )}
              {(this.state.isShowChooseOtherFile === true ||
                this.props.dataModal.imageRemedy === null) && (
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSendRemedy()}>
            Send
          </Button>{" "}
          <Button color="secondary" onClick={closeRemedyModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
  