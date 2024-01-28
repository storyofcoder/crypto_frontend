import React, { useEffect, useState } from 'react'

const useComponentMount = () => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return {isMounted}
}

export default useComponentMount
