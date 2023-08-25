import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatusUser, loadUsersList } from '../store/users';

const User = () => {
  const { userId, edit } = useParams()
  const dataStatus = useSelector(getDataStatusUser())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsersList())
    }
  }, [])
  if (!dataStatus) return 'Loading user...'
  return (
    <>
      {userId && <UserPage id={userId} />}
      {edit && <EditUserPage />}
    </>
  )
}
export default User;
