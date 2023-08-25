import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import localStorageService from '../../services/localstorage.service';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUsersById } from '../../store/users';

const UserPage = () => {
  const history = useHistory()
  const currentUserId = useSelector(getCurrentUserId())
  const userId = localStorageService.getUserId()

  const user = useSelector(getUsersById(userId))
  const handleClick = () => {
    history.push(`${userId}/edit`)
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUserId === user._id && <button
          className="position-absolute top-0 end-0 btn btn-danger btn-sm"
          onClick={handleClick}>
          Change
          {/* <i className="bi bi-gear"></i> */}
        </button>}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="150"
            height="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.email}</p>
            <p>Id пользователя: <strong>{user._id}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
