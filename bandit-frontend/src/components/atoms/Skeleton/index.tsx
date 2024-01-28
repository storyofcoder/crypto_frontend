import React from "react";
import Skeleton from "react-loading-skeleton";

const CustomSkeleton = ({ circle, radius, ...rest }: any) => {
  return (
    <Skeleton
      count={1}
      style={{
        opacity: 0.2,
        borderRadius: circle ? '50%' : radius ? radius : 0,
      }}
      {...rest}
    />
  )
}

export default CustomSkeleton
