import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';

import { adminMenu } from './menuApp';

import './Header.scss';

import { FormattedMessage } from "react-intl";

import { LANGUAGES, USER_ROLE } from "../../utils";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          menuApp: [],
        };
      }
      handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
      };
    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />
          </span>
          <span
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
 };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
