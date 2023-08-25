import { useEffect, useState } from 'react'
import furniturs from '../mockData/furniturs.json'
import qualities from '../mockData/qualities.json'
import sizes from '../mockData/sizes.json'
import types from '../mockData/types.json'
import users from '../mockData/users.json'

import httpService from '../services/http.service'

const useMockData = () => {
  const statusConst = {
    idle: 'Not started',
    pending: 'In process',
    successed: 'Ready',
    error: 'Error',
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConst.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const symmeryCount =
    furniturs.length +
    qualities.length +
    users.length +
    sizes.length +
    types.length
  const incremenCount = () => {
    setCount((prev) => prev + 1)
  }
  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending)
    }
    const newProgress = Math.floor((count / symmeryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConst.successed)
    }
  }
  useEffect(() => {
    updateProgress()
  }, [count])

  async function initialize() {
    try {
      for (const furniture of furniturs) {
        await httpService.put('furniturs/' + furniture._id, furniture)
        incremenCount()
      }
      for (const size of sizes) {
        await httpService.put('sizes/' + size._id, size)
        incremenCount()
      }
      for (const type of types) {
        await httpService.put('types/' + type._id, type)
        incremenCount()
      }
      for (const quality of qualities) {
        await httpService.put('qualites/' + quality._id, quality)
        incremenCount()
      }
      for (const user of users) {
        await httpService.put('users/' + user._id, user)
        incremenCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConst.error)
    }
  }
  return { error, initialize, progress, status }
}

export default useMockData
