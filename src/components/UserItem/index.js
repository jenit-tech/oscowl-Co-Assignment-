import { Component } from 'react';
import './index.css';

class UserItem extends Component {
  handleDelete = () => {
    const { userDetails, deleteUser } = this.props;
    deleteUser(userDetails.id);
  };

  handleToggleStatus = () => {
    const { userDetails, toggleUserStatus } = this.props;
    toggleUserStatus(userDetails.id);
  };

  render() {
    const { userDetails } = this.props;
    const { name, email, active } = userDetails;

    return (
      <li className="user-item">
        <div className="user-info">
          <p className="user-name">{name}</p>
          <p className="user-email">{email}</p>
          <p className={`user-status ${active ? 'active' : 'inactive'}`}>
            {active ? 'Active' : 'Inactive'}
          </p>
        </div>

        <div className="user-actions">
          <button
            className={`status-toggle-btn ${active ? 'deactivate' : 'activate'}`}
            onClick={this.handleToggleStatus}
          >
            {active ? 'Deactivate' : 'Activate'}
          </button>
          <button className="delete-btn" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      </li>
    );
  }
}

export default UserItem;