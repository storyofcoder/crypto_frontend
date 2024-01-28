import React, { useEffect, useState } from "react";
import { useWindowSize } from "../services/hooks";

const UseGridCount = ({ containerRef, isSmallFrame, filterOpen, small, big }) => {
  const [gridCount, setGridCount] = useState(0)
  const size = useWindowSize()
  useEffect(() => {
    const containerWidth = containerRef?.current?.offsetWidth || size.width
    let grid = Math.floor(containerWidth / (isSmallFrame ? small : big))
    if (!grid) {
      setGridCount(1)
    } else {
      setGridCount(grid)
    }
  }, [containerRef, size, isSmallFrame, filterOpen])

  useEffect(() => {
    setTimeout(() => {
      const containerWidth = containerRef?.current?.offsetWidth || size.width
      let grid = Math.floor(containerWidth / (isSmallFrame ? small : big))
      if (!grid) {
        setGridCount(1)
      } else {
        setGridCount(grid)
      }
    }, 300)
  }, [filterOpen])

  return { gridCount }
}

export default UseGridCount
