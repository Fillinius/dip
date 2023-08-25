import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import furnitursService from '../services/furnitursService';
import Loader from '../utils/loader';

const FurnitursContext = React.createContext()

export const useFurniturs = () => {
  return useContext(FurnitursContext)
}

const FurnitureProvider = ({ children }) => {
  const [furniturs, setFurniturs] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getFurniturs()
  }, [])

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

  async function getFurniturs() {
    try {
      const content = await furnitursService.get()
      setFurniturs(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  return (
    <FurnitursContext.Provider value={{ furniturs }}>
      {!isLoading ? children : (<Loader />)}
    </FurnitursContext.Provider>
  )
}

FurnitureProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default FurnitureProvider
