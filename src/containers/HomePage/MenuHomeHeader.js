import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { USER_ROLE } from '../../utils';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import './MenuHomeHeader.scss'
import { toast } from "react-toastify";
import { getProfileByUser } from "../../services/userService";
import Profile from "../Patient/Profile";
import ChangePassword from "../Patient/ChangePassword";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const MenuHomeHeader = () => {
  //mapStateToProps Redux
  const { isLoggedIn,language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));
  const userInfo = useSelector((state) => state.user.userInfo);
  const [data, setData] = useState([]);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false); // Modal cho đổi mật khẩu

  const ShowProfile = async () => {
    if (userInfo && userInfo.email) {
      const email = userInfo.email;
      const response = await getProfileByUser(email);
      setData(response.users);
    }
  };

  useEffect(() => {
    ShowProfile();
  }, [userInfo]);

  const dispatch = useDispatch(); 
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItemMenu = (item) => {
    switch (item) {
      case "login":
        history.push("/login");
        break;
      case "forgot-password":
        history.push("/forgot-password");
        break;
      case "logout":
        dispatch(actions.processLogout());
        toast.success("Đăng xuất thành công")
        // window.location.reload(); //mapDispathToProps
        break;
      case "sign-up":
        history.push("/sign-up");
        break;
      case "profile":
        ShowProfile();
        setIsProfileModalVisible(true); // Hiện modal profile
        handleClose();
        break;
      case "admin":
        history.push("/admin-dashboard")
        break;
      case "patient":
        history.push("/admin-dashboard/patient/manage-appointment-patient")  
        break;
      case "password":
        setIsChangePasswordModalVisible(true); // Hiện modal thay đổi mật khẩu
        handleClose();   
      default:
      // code block
    }
  };


  const handleProfileModalCancel = () => {
    setIsProfileModalVisible(false);
  };

  const handleChangePasswordModalCancel = () => {
    setIsChangePasswordModalVisible(false);
  };

  return (
    <div>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      > */}
      {/* Open Menu */}
      <span onClick={handleClick}>
        <i className="fas fa-bars"></i>
      </span>

      {/* </Button> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        {!isLoggedIn && (
          <>
            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("login");
              }}
            >
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg>
              <ListItemText primary="Đăng nhập" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("forgot-password");
              }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-2 12H5V7h14v10zm-9-1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1c0-1.11-.9-2-2-2-1.11 0-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm.8-6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v1h-2.4v-1z"/></svg>
              <ListItemText primary="Quên mật khẩu" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("sign-up");
              }}
            >
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g/><g><g><path d="M16.67,13.13C18.04,14.06,19,15.32,19,17v3h4v-3 C23,14.82,19.43,13.53,16.67,13.13z" fill-rule="evenodd"/></g><g><circle cx="9" cy="8" fill-rule="evenodd" r="4"/></g><g><path d="M15,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4c-0.47,0-0.91,0.1-1.33,0.24 C14.5,5.27,15,6.58,15,8s-0.5,2.73-1.33,3.76C14.09,11.9,14.53,12,15,12z" fill-rule="evenodd"/></g><g><path d="M9,13c-2.67,0-8,1.34-8,4v3h16v-3C17,14.34,11.67,13,9,13z" fill-rule="evenodd"/></g></g></g></svg>
              <ListItemText primary="Đăng ký" />
            </StyledMenuItem>
          </>
        )}
        {isLoggedIn &&  userInfo.roleId === USER_ROLE.PATIENT&&(
          <>
            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("profile");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              <ListItemText primary="Hồ sơ" />
            </StyledMenuItem>
            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("password");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"/></g></g></svg>
              <ListItemText primary="Đổi mật khẩu" />
            </StyledMenuItem>

            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("patient");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              <ListItemText primary="Lịch hẹn" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("logout");
              }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
              <ListItemText primary="Đăng xuất" />
            </StyledMenuItem>
          </>
        )}
          {isLoggedIn &&  userInfo.roleId === USER_ROLE.ADMIN&&(
          <>
            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("profile");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              <ListItemText primary="Hồ sơ" />
            </StyledMenuItem>
            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("password");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"/></g></g></svg>
              <ListItemText primary="Đổi mật khẩu" />
            </StyledMenuItem>

            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("admin");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2h-3v3h-2v-3H8v-2h3V7h2v3h3z"/></svg>
              <ListItemText primary="Admin" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("logout");
              }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
              <ListItemText primary="Đăng xuất" />
            </StyledMenuItem>
          </>
        )}
         {isLoggedIn &&  userInfo.roleId === USER_ROLE.DOCTOR&&(
          <>
            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("profile");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              <ListItemText primary="Hồ sơ" />
            </StyledMenuItem>
            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("password");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"/></g></g></svg>
              <ListItemText primary="Đổi mật khẩu" />
            </StyledMenuItem>

            <StyledMenuItem
             onClick={() => {
              handleClickItemMenu("admin");
            }}
            //  onClick={() => {
            //    handleClickItemMenu("logout");
            //  }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2h-3v3h-2v-3H8v-2h3V7h2v3h3z"/></svg>
              <ListItemText primary="Doctor" />
            </StyledMenuItem>

            <StyledMenuItem
              onClick={() => {
                handleClickItemMenu("logout");  
              }}
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
              <ListItemText primary="Đăng xuất" />
            </StyledMenuItem>
          </>
        )}
      </StyledMenu>
            {/* Modal hiện thông tin profile */}
            <Profile
        isVisible={isProfileModalVisible}
        onCancel={handleProfileModalCancel}
        data={data}
        onSave={() => {
          ShowProfile(); // Gọi lại hàm ShowProfile khi lưu
        }}
      />


      {/* Modal đổi mật khẩu */}
      <ChangePassword
        isVisible={isChangePasswordModalVisible}
        onCancel={handleChangePasswordModalCancel}
        data={data}
        onChangePassword={(values) => {
          console.log(values);
          // Gọi API để thay đổi mật khẩu ở đây
        }}
      />
    </div>
  );
};




export default MenuHomeHeader;
