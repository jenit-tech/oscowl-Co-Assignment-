import { Component } from 'react';
import UserItem  from '../UserItem'; 
import './index.css';

class UserManagementDashboard extends Component {
  state = {
    usersList: [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', active: true },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', active: false },
      { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', active: true },
      { id: 4, name: 'Robert Brown', email: 'robert.brown@example.com', active: false },
      { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', active: true },
    ],
    formData: {
      name: '',
      email: '',
      department: '',
    },
    formErrors: {
      nameError: '',
      emailError: '',
      departmentError: '',
    },
  };

  updateField = field => event => {
    this.setState(prevState => ({
      formData: { ...prevState.formData, [field]: event.target.value },
    }));
  };

  deleteUser = id => {
    this.setState(prevState => ({
      usersList: prevState.usersList.filter(user => user.id !== id),
    }));
  };

  toggleUserStatus = id => {
    this.setState(prevState => ({
      usersList: prevState.usersList.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      ),
    }));
  };

  validateForm = () => {
    const { name, email, department } = this.state.formData;
    let isValid = true;
    const errors = {};

    if (!name.trim()) {
      isValid = false;
      errors.nameError = 'Please provide a valid name.';
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.emailError = 'Please provide a valid email address.';
    }
    if (!department.trim()) {
      isValid = false;
      errors.departmentError = 'Please select a valid department.';
    }

    this.setState({ formErrors: errors });
    return isValid;
  };

  onSubmitForm = event => {
    event.preventDefault();
    if (this.validateForm()) {
      const { formData, usersList } = this.state;
      const newUser = {
        id: usersList.length + 1,
        ...formData,
        active: true,
      };

      this.setState(prevState => ({
        usersList: [...prevState.usersList, newUser],
        formData: {
          name: '',
          email: '',
          department: '',
        },
        formErrors: {
          nameError: '',
          emailError: '',
          departmentError: '',
        },
      }));
    }
  };

  renderInputField = (label, value, field, errorMsg, placeholder) => (
    <div className="input-container">
      <label htmlFor={field} className="input-label">
        {label}
      </label>
      <input
        type="text"
        value={value}
        className="input-field"
        id={field}
        placeholder={placeholder}
        onChange={this.updateField(field)}
      />
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );

  render() {
    const { usersList, formData, formErrors } = this.state;

    return (
      <div>
        <h1 className="dashboard-title">User Management Dashboard</h1>

        <ul className="users-list">
          {usersList.map(user => (
            <UserItem
              key={user.id}
              userDetails={user}
              deleteUser={this.deleteUser}
              toggleUserStatus={this.toggleUserStatus}
            />
          ))}
        </ul>

        <form className="form" onSubmit={this.onSubmitForm}>
          {this.renderInputField(
            'Name',
            formData.name,
            'name',
            formErrors.nameError,
            'Enter the user name'
          )}
          {this.renderInputField(
            'Email',
            formData.email,
            'email',
            formErrors.emailError,
            'Enter the user email'
          )}
          {this.renderInputField(
            'Department',
            formData.department,
            'department',
            formErrors.departmentError,
            'Enter the user department'
          )}

          <button type="submit" className="button">
            Add User
          </button>
        </form>
      </div>
    );
  }
}

export default UserManagementDashboard;