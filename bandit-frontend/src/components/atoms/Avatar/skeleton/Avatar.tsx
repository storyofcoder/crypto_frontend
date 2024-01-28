import React from "react";
import Skeleton from "../../Skeleton";
import styled from "styled-components";

const AvatarSkeletonInfoWrapper = styled.div`
  width: 100% !important;
  h4 {
    margin: 0 !important;
    height: 10px !important;
    span {
      height: 10px !important;
      width: 48% !important;
    }
  }
  p {
    span {
      width: 60% !important;
    }
  }
`

const AvatarSkeletonWrapper = styled.div`
  display: flex;
  text-decoration: none;
  span {
    height: 100%;
  }
  &:hover {
    h4 {
      opacity: 1;
    }
  }

  .avatar-skeleton__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
  }

  .avatar-skeleton__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;
    h4 {
      height: 15px;
      margin: 0px;
      span {
        height: 15px;
        width: 70%;
      }
    }

    p {
      height: 10px;
      span {
        height: 10px;
        width: 70px;
      }
    }
  }
`

const AvatarSkeleton = ({ small = false }: any) => {
  return (
    <AvatarSkeletonWrapper>
      {small ? (
        <>
          <div className="avatar-skeleton__img">
            <Skeleton circle={true} />
          </div>
          <AvatarSkeletonInfoWrapper className="avatar-skeleton__info">
            <h4>
              <Skeleton />
            </h4>
            <p>
              <Skeleton />
            </p>
          </AvatarSkeletonInfoWrapper>
        </>
      ) : (
        <div className="avatar-skeleton__info">
          <h4>
            <Skeleton />
          </h4>
          <p>
            <Skeleton />
          </p>
        </div>
      )}
    </AvatarSkeletonWrapper>
  )
}

export default AvatarSkeleton
