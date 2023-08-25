import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import sizeService from '../services/sizeService';
import { toast } from 'react-toastify';

const SizeContext = React.createContext()

export const useSize = () => {
  return useContext(SizeContext)
}

export const SizeProvider = ({ children }) => {
  const [sizes, setSizes] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getSizeList = async () => {
      try {
        const content = await sizeService.get()
        setSizes(content)
        setLoading(false)
      } catch (error) {
        errorCatcher(error)
      }
    }
    getSizeList()
  }, [])

  const getSize = (id) => {
    return sizes.find((q) => q._id === id)
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <SizeContext.Provider
      value={{
        sizes,
        isLoading,
        getSize
      }}>
      {children}
    </SizeContext.Provider>
  )
}
SizeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
