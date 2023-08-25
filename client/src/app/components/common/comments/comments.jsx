import { orderBy } from 'lodash';
import React, { useEffect } from 'react';
import AddCommentForm from './addCommentForm';
import CommentsList from './commentsList';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserData } from '../../../store/users';
import { createComment, getComments, getCommentsLoading, loadcommentsList, removeComment } from '../../../store/comments';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const { furnitureId } = useParams()
  const comments = useSelector(getComments())
  const isLoading = useSelector(getCommentsLoading())
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUserData())

  useEffect(() => {
    dispatch(loadcommentsList(furnitureId))
  }, [furnitureId])

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: furnitureId }))
  };
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id))
  };
  const sortedComments = orderBy(comments, ['created_at'], ['desc']);
  return (
    <>
      {currentUser && (<div className="card mb-2">
        {''}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>)}
      {currentUser && sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (<CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />) : 'Loading comments...'}

          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
