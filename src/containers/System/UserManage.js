import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],   
        };
    };
    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            });
        }
      };
    /** Life cycle
     *  Run your component
     * 1. Run constructor -> init state
     * 2. Run Didmount
     * 3. Render
     */
    render() {
        console.log(this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-containers">
                <div className="title text-center">Manage users</div>
                <div className="users-table mt-4 mx-3">
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>FristName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            console.log(`Check map ${item}, ${index}`)
                            return(
                                <tr>
                                     <td>{item.email}</td>
                                     <td>{item.firstName}</td>
                                     <td>{item.lastName}</td>
                                     <td>{item.address}</td>
                                     <td>
                                        <button className="btn-edit"><i class="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete"><i class="fas fa-trash"></i></button>
                                     </td>
                                </tr>
                            )
                        })
                        }
                </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
