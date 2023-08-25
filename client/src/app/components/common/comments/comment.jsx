import React from 'react';
import PropTypes from 'prop-types';
import formatTime from '../../../utils/formatTime';
import { useSelector } from 'react-redux'
import { getCurrentUserId, getUsersById } from '../../../store/users';
const Comment = ({
  content,
  create_at: created,
  _id: id,
  userId,
  onRemove
}) => {
  const currentUserId = useSelector(getCurrentUserId())
  const user = useSelector(getUsersById(userId));
  return (
    <div className=" card-body  mb-3">
      <div className="row">
        <div className="col">
          {user && (<div className="d-flex flex-start ">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user && user.name}{' '}
                    <span className="small">
                      - {formatTime(created)}
                    </span>
                  </p>
                  {currentUserId === userId && (
                    <button
                      className="btn btn-sm btn-danger d-flex align-items-center"
                      onClick={() => onRemove(id)}
                    >
                      {/* <i className="bi bi-x-lg"></i> */}
                      del
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
};
Comment.propTypes = {
  content: PropTypes.string,
  edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  create_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.string,
  onRemove: PropTypes.func,
  _id: PropTypes.string
};

export default Comment;
