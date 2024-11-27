import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  cancelBooking,
  getAllPatientForDoctor,
  postSendRemedy,
  postCreateRemedy,
  cancelBookingEmail
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import CreateImageRemedyModal from "./CreateImageRemedyModal";
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
      isOpenCancelModal: false,
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
      let res = await getAllPatientForDoctor({
        doctorId: user.id,
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
      await this.getDataPatient();
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
  handleBtnConfirm = (item) => {
    if(item.statusId === 'S2'){
      let data = {
        doctorId: item.doctorId,
        patientId: item.patientId,
        email: item.patientData.email,
        timeType: item.timeType,
        patientName: item.patientData.firstName,
        imageRemedy: item.imageRemedy,
        token: item.token,
      };
      this.setState({
        isOpenRemedyModal: true,
        dataModal: data,
      });
    }
    else{
      if(item.statusId === 'S1')
        {
          this.setState({
            isOpenCreateImageRemedyModal: false,
          });
          toast.error("Lịch hẹn chưa được xác nhận...!");
        }
        if(item.statusId === 'S3')
          {
            this.setState({
              isOpenCreateImageRemedyModal: false,
            });
            toast.error("Lịch hẹn đã được hoàn thành...!");
          }
        if(item.statusId === 'S4')
          {
            this.setState({
              isOpenCreateImageRemedyModal: false,
            });
            toast.error("Lịch hẹn đã bị hủy...!");
          }
  
    }
  };
  handleBtnCreateRemedy = (item) => {
    if(item.statusId === 'S2'){
      let name = null;
      if (
        this.props.user &&
        this.props.user.firstName &&
        this.props.user.lastName
      ) {
        name = `${this.props.user.lastName} ${this.props.user.firstName}`;
      }
      if (
        this.props.user &&
        this.props.user.firstName &&
        this.props.user.lastName === null
      ) {
        name = `${this.props.user.firstName}`;
      }
      if (
        this.props.user &&
        this.props.user.firstName === null &&
        this.props.user.lastName
      ) {
        name = `${this.props.user.lastName}`;
      }
      let data = {
        doctorId: item.doctorId,
        patientId: item.patientId,
        email: item.patientData.email,
        date: item.date,
        token: item.token,
        timeType: item.timeType,
        patientName: item.patientData.firstName,
        doctorName: name,
      };
      this.setState({
        isOpenCreateImageRemedyModal: true,
        dataModalCreateRemedy: data,
      });
    }
    else{
      if(item.statusId === 'S1')
      {
        this.setState({
          isOpenCreateImageRemedyModal: false,
        });
        toast.error("Lịch hẹn chưa được xác nhận...!");
      }
      if(item.statusId === 'S3')
        {
          this.setState({
            isOpenCreateImageRemedyModal: false,
          });
          toast.error("Lịch hẹn đã được hoàn thành...!");
        }
      if(item.statusId === 'S4')
        {
          this.setState({
            isOpenCreateImageRemedyModal: false,
          });
          toast.error("Lịch hẹn đã bị hủy...!");
        }

     
    }

  };

  handleBtnCancel = async (item) => {
    this.setState({ isShowLoading: true });
    let checkTime =''
    let note = 'Bác sĩ bận đột xuất';
    if(item.timeTypeDataPatient.valueVi.length-1 === 10){
      checkTime = item.timeTypeDataPatient.valueVi[7]
    }
    if(item.timeTypeDataPatient.valueVi.length-1 === 11){   
      checkTime = item.timeTypeDataPatient.valueVi.slice(7,9)  
    }
    if(item.timeTypeDataPatient.valueVi.length-1 === 12){
      checkTime = item.timeTypeDataPatient.valueVi.slice(8,10)
    }

    if(new Date().getHours() > checkTime){
      note = 'Bệnh nhân không có mặt'
    }
    if(new Date().getHours() == checkTime && new Date().getMinutes() > 0){
      note = 'Bệnh nhân không có mặt'
    }
    if(item.statusId === 'S2'){
      let res = await cancelBookingEmail({
        id: item.id,
        doctorId: item.doctorId,
        patientId: item.patientId,
        timeType: item.timeType,
        date: item.date,
        note: note,
        time: item.timeTypeDataPatient.valueVi,
        dateString: new Date(this.state.currentDate).getDate(),
        month: new Date(this.state.currentDate).getMonth(),
        year: new Date(this.state.currentDate).getFullYear(),
      });
      if (res && res.errCode === 0) {
        this.setState({ isShowLoading: false });
        toast.success("Cancel appointment succeed!");
        await this.getDataPatient();
      } else {
        this.setState({ isShowLoading: false });
        toast.error("Something wrongs...!");
      }
    }
    else{
      if(item.statusId === 'S1'){
      this.setState({ isShowLoading: false });
      toast.error("Lịch hẹn chưa được khách hàng xác nhận...!");
      }
      if(item.statusId === 'S3'){
        this.setState({ isShowLoading: false });
        toast.error("Lịch hẹn đã được hoàn thành...!");
      }
      if(item.statusId === 'S4'){
        this.setState({ isShowLoading: false });
        toast.error("Lịch hẹn đã hủy...!");
      }
      }
   
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  closeCreateImageRemedyModal = () => {
    this.setState({
      isOpenCreateImageRemedyModal: false,
      dataModalCreateRemedy: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({ isShowLoading: true });

    let totalCostData = null;
    let specialtyIdData = null;
    if (
      this.props.user &&
      this.props.user.Doctor_Infor &&
      this.props.user.Doctor_Infor.priceTypeData &&
      this.props.user.Doctor_Infor.priceTypeData.valueEn
    ) {
      totalCostData = this.props.user.Doctor_Infor.priceTypeData.valueEn;
    }
    if (
      this.props.user &&
      this.props.user.Doctor_Infor &&
      this.props.user.Doctor_Infor.specialtyId
    ) {
      specialtyIdData = this.props.user.Doctor_Infor.specialtyId;
    }



    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
      totalCost: totalCostData,
      specialtyId: specialtyIdData,
    });
    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      toast.success("Send Remedy succeed!");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: true });
      toast.error("Something wrongs...!");
    }
    this.setState({ isShowLoading: false });
  };

  createRemedyImage = async (dataChild) => {
    let { dataModalCreateRemedy } = this.state;
    this.setState({ isShowLoading: true });

    let res = await postCreateRemedy({
      email: dataChild.email,
      listMedicine: dataChild.listMedicine,
      desciption: dataChild.desciption,
      doctorId: dataModalCreateRemedy.doctorId,
      patientId: dataModalCreateRemedy.patientId,
      timeType: dataModalCreateRemedy.timeType,
      date: dataModalCreateRemedy.date,
      token: dataModalCreateRemedy.token,
      language: this.props.language,
      patientName: dataModalCreateRemedy.patientName,
      doctorName: dataModalCreateRemedy.doctorName,
    });
    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      toast.success("Create Remedy succeed!");
      this.closeCreateImageRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: true });
      toast.error("Something wrongs...!");
    }
    this.setState({ isShowLoading: false });
  };

  render() {
    let {
      dataPatient,
      isOpenRemedyModal,
      isOpenCreateImageRemedyModal,
      dataModal,
      dataModalCreateRemedy,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
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
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Số điện thoại</th>
                      <th>Giới tính</th>
                      <th>Năm sinh</th>
                      <th>Lý do khám</th>
                      <th>Actions</th>
                      <th>Trạng thái</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        console.log(item)
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient?.valueVi
                            : item.timeTypeDataPatient?.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData?.valueVi
                            : item.patientData.genderData?.valueVi;

                        let date = new Date (item.patientData.birthday).getDate()
                        let month = new Date (item.patientData.birthday).getMonth()+1
                        let year = new Date (item.patientData.birthday).getFullYear()
                        

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.lastName} {item.patientData.firstName} </td>
                            <td>{item.patientData.address}</td>
                            <td>
                              {item.patientData.phonenumber
                                ? item.patientData.phonenumber
                                : ""}
                            </td>
                            <td>{gender}</td>
                            <td>{`${date}/${month}/${year}`}</td>
                            <td>{item.reason}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Gửi đơn thuốc
                              </button>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnCreateRemedy(item)}
                              >
                                Tạo đơn thuốc
                              </button>
                              <button
                                className="mp-btn-cancel"
                                onClick={() => this.handleBtnCancel(item)}
                              >
                                Hủy
                              </button>
                            </td>
                            <td>
                              {item.statusId === 'S1' ? 'Lịch hẹn mới chưa xác nhận': ''}
                              {item.statusId === 'S2' ? 'Đã xác nhận': ''}
                              {item.statusId === 'S3' ? 'Đã khám xong': ''}
                              {item.statusId === 'S4' ? 'Đã hủy': ''}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="10" style={{ textAlign: "center" }}>
                          Không có lịch khám
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
          <CreateImageRemedyModal
            isOpenCreateImageRemedyModal={isOpenCreateImageRemedyModal}
            dataModalCreateRemedy={dataModalCreateRemedy}
            closeCreateImageRemedyModal={this.closeCreateImageRemedyModal}
            createRemedyImage={this.createRemedyImage}
          />
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
