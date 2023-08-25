import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import typeService from '../services/typeService';
import { toast } from 'react-toastify';

const TypeContext = React.createContext()

export const useType = () => {
  return useContext(TypeContext)
}

export const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getTypeList = async () => {
      try {
        const content = await typeService.get()
        setTypes(content)
        setLoading(false)
      } catch (error) {
        errorCatcher(error)
      }
    }
    getTypeList()
  }, [])

  const getType = (id) => {
    return types.find((q) => q._id === id)
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
    <TypeContext.Provider
      value={{
        types,
        isLoading,
        getType
      }}>
      {children}
    </TypeContext.Provider>
  )
}
TypeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
