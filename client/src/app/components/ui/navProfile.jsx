import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCurrentUserData } from '../../store/users';

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData())
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }
  if (!currentUser) return 'Loading...'
  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn dropdown-toggle d-flex align-item-center'>
        <img src={currentUser.image} alt='аватар пользователя' width="20" height="20" className='img-responsive' />
      </div>
      <div className={'w-50 dropdown-menu ' + (isOpen ? 'show' : '')}>
        <Link className={'dropdown-item'} to={`/users/${currentUser._id}`}>Profile</Link>
        <Link className={'dropdown-item'} to={'/logOut'}>LogOut</Link>
      </div>
    </div>
  );
}

export default NavProfile;
