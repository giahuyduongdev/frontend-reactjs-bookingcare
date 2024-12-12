import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageAppointmentPatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  cancelBooking,
  getAllAppointmentForPatient
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      isOpenCreateImageRemedyModal: false,
      dataModal: {},
      dataModalCreateRemedy: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    await this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    if (user && user.id) {
      let res = await getAllAppointmentForPatient({
        patientId: user.id,
        date: formatedDate,
      });
      if (res && res.errCode === 0) {
        this.setState({
          dataPatient: res.data,
        });
      }
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.user !== prevProps.user) {
      await this.getAllAppointmentForPatient();
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnCancel = async (item) => {
    this.setState({ isShowLoading: true });
    if(item.statusId === "S1" || item.statusId ==="S2"){
      let res = await cancelBooking({
        id: item.id,
        doctorId: item.doctorId,
        patientId: item.patientId,
        timeType: item.timeType,
        date: item.date,
      });
      if (res && res.errCode === 0) {
        this.setState({ isShowLoading: false });
        toast.success("Hủy lịch hẹn thành công");
        await this.getDataPatient();
      } else {
        this.setState({ isShowLoading: false });
        toast.error("Lỗi");
      }
    }
    else{
        if(item.statusId === 'S3'){
          this.setState({ isShowLoading: false });
          toast.error("Lịch hẹn đã được hoàn thành");
        }
        if(item.statusId === 'S4'){
          this.setState({ isShowLoading: false });
          toast.error("Lịch hẹn đã hủy");
        }
    }

  };
  render() {
    let {
      dataPatient,
    } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Lịch hẹn khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <button class="btn-green" onClick={() =>{this.componentDidMount()}}>
			          <img class="icon" src="https://htmlacademy.ru/assets/icons/reload-6x-white.png"/>
		          </button> 
              <div className="col-12 table-manage-patient">
                <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Bác sĩ</th>
                      <th>Chuyên khoa</th>
                      <th>Tên phòng khám</th>
                      <th>Địa chỉ</th>
                      <th>Lý do khám</th>
                      <th>Giá tiền</th>
                      <th>Hình thức thanh toán</th>
                      <th>Actions</th>
                      <th>Trạng thái</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                        language === LANGUAGES.VI
                          ? item.timeTypeDataPatient?.valueVi
                          : item.timeTypeDataPatient?.valueEn;
                        let doctorName = item.doctorDataAppointment.lastName + " " + item.doctorDataAppointment.firstName;
                        let specialty = item.doctorDataAppointmentDetail.specialtyData.name;
                        let clinic = item.doctorDataAppointmentDetail.nameClinic;
                        let clinicAddress = item.doctorDataAppointmentDetail.addressClinic;
                        let reason = item.reason;
                        let price = item.doctorDataAppointmentDetail.priceTypeData.valueVi;
                        let payment = item.doctorDataAppointmentDetail.paymentTypeData.valueVi;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{doctorName}</td>
                            <td>{specialty}</td>
                            <td>{clinic}</td>
                            <td>{clinicAddress}</td>
                            <td>{reason}</td>
                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</td>
                            <td>{payment}</td>
                            <td>
                              <button
                                className="mp-btn-cancel"
                                onClick={() => this.handleBtnCancel(item)}
                              >
                                Hủy
                              </button>
                            </td>
                            <td>
                            {item.statusId === 'S1' ? 'Chưa xác nhận qua email': ''}
                            {item.statusId === 'S2' ? 'Đã xác nhận': ''}
                            {item.statusId === 'S3' ? 'Đã khám xong': ''}
                            {item.statusId === 'S4' ? 'Đã hủy': ''}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="11" style={{ textAlign: "center" }}>
                          Không có lịch hẹn
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, user: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
