import React, { useEffect, useState } from 'react'

const Loader = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count === 99) return
    const id = setInterval(() =>
      setCount((prevState) => prevState + 1), 10)
    return () => {
      clearInterval(id)
    }
  }, [count])

  return (
    <div className="loaderRoot">
      <div className="loaderText">
        <p>{`${count} %`}</p>
      </div>
      <div className="containerLoader">
        <div
          className="loader"
          style={{ width: `${count}%` }}
        ></div>
      </div>
    </div>
  )
}

export default Loader
