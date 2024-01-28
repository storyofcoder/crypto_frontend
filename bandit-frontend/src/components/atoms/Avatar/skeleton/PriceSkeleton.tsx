import React from "react";
import Skeleton from "../../Skeleton";
import styled from "styled-components";

const AvatarSkeleton = styled.div`
  .avatar-skeleton__info {
    display: flex;
    align-items: center;

    h4 {
      padding-left: 5px;
      margin: 0;
      span {
        height: 10px;
        width: 150px;
      }
    }
  }

  .mt20 {
    margin-top: 20px;
  }
`

const PriceSkeleton = () => {
  return (
    <AvatarSkeleton>
      <div className="avatar-skeleton__info mt20">
        <p>
          <Skeleton />
        </p>
        <h2>
          <Skeleton />
        </h2>
        <p>
          <Skeleton />
        </p>
      </div>
    </AvatarSkeleton>
  )
}

export default PriceSkeleton
