import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import commentService from '../services/commentsService';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';
import { useParams } from 'react-router-dom';

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const currentUserId = useSelector(getCurrentUserId())
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  // вариация получения userId
  const furnitursId = useParams()
  //
  useEffect(() => {
    getComments();
  }, [furnitursId]);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: furnitursId,
      created_at: Date.now(),
      furnitursId: currentUserId
    };
    try {
      const content = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function getComments() {
    try {
      const content = await commentService.getComments(furnitursId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  async function removeComment(id) {
    try {
      const content = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((c) => c._id !== id)
        );
      }
    } catch (error) {
      errorCatcher(error);
    }
  }
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
