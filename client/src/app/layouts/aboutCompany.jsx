import React from 'react';
import useMockData from '../utils/mockData';
import { useSelector } from 'react-redux';
import { getUserId } from '../services/localstorage.service';
import { getUsersById } from '../store/users';

const AboutCompany = () => {
  const userId = getUserId()
  const userById = useSelector(getUsersById(userId))
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }
  return (
    <div className='container mt-5'>
      <h1>About Company</h1>
      {userById && userById.name === 'Администратор' && <>
        <h3>Инициализация данных FireBase</h3>
        <ul>
          <li>Status:{status}</li>
          <li>Progress:{progress}%</li>
          {error && <li>Error:{error}</li>}
        </ul>
        <button
          className='btn btn-primary'
          onClick={handleClick}
        >Инициализировать</button>
      </>}

    </div>
  )
}

export default AboutCompany;
