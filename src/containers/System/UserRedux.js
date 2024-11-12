import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
          genderArr: [],
          positionArr: [],
          roleArr: [],
          previewImgURL: "",
          isOpen: false,
    
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          gender: "",
          position: "",
          role: "",
          avatar: "",
    
          action: "",
          userEditId: "",
        };
      }

    componentDidMount() {
    }


    render() {
        return (
            <div className="user-redux-container">
                <div className="title">
                    <FormattedMessage id="manage-user.title" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className = "row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
