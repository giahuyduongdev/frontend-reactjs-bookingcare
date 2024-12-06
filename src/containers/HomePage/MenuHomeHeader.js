import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { getProfileByUser } from "../../services/userService";
import Profile from "../Patient/Profile";
import './MenuHomeHeader.scss';
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
  const { isLoggedIn, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
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
    } else {
      console.log("User info is not available or email is missing.");
    }
  };

  useEffect(() => {
    ShowProfile();
  }, [userInfo]);

  const dispatch = useDispatch();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

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
        break;
      case "sign-up":
        history.push("/sign-up");
        break;
      case "change-password":
        setIsChangePasswordModalVisible(true); // Hiện modal thay đổi mật khẩu
        handleClose();
        break;
      case "profile":
        setIsProfileModalVisible(true); // Hiện modal profile
        handleClose();
        break;
      default:
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
      <span onClick={handleClick}>
        <i className="fas fa-bars"></i>
      </span>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!isLoggedIn && (
          <>
            <StyledMenuItem onClick={() => handleClickItemMenu("login")}>
              <ListItemIcon>
                <VpnKeyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </StyledMenuItem>

            <StyledMenuItem onClick={() => handleClickItemMenu("forgot-password")}>
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Forgot Password" />
            </StyledMenuItem>

            <StyledMenuItem onClick={() => handleClickItemMenu("sign-up")}>
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sign Up Account" />
            </StyledMenuItem>
          </>
        )}
        {isLoggedIn && (
          <>
            <StyledMenuItem onClick={() => handleClickItemMenu("profile")}>
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </StyledMenuItem>

            <StyledMenuItem onClick={() => handleClickItemMenu("change-password")}>
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </StyledMenuItem>

            <StyledMenuItem onClick={() => handleClickItemMenu("logout")}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
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
          ShowProfile(userInfo.email); // Gọi lại hàm ShowProfile khi lưu
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
