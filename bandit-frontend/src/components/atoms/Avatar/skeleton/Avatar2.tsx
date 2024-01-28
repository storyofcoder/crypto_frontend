import React from "react";
import Skeleton from "../../Skeleton";
import styled from "styled-components";

const AvatarSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  span {
    height: 100%;
  }

  p {
    margin: 0;
    span {
      height: 10px;
      width: 100px;
    }
  }

  .avatar2-skeleton__info {
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

  .avatar2-skeleton__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;

    span {
      height: 100%;
    }
  }
`

const Avatar2Skeleton = () => {
  return (
    <AvatarSkeletonWrapper>
      <p>
        <Skeleton />
      </p>

      <div className="avatar2-skeleton__info">
        <div className="avatar2-skeleton__img">
          <Skeleton circle={true} />
        </div>
        <h4>
          <Skeleton />
        </h4>
      </div>
    </AvatarSkeletonWrapper>
  )
}

export default Avatar2Skeleton
