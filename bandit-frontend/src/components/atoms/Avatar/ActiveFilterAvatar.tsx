import React from "react";
import styled from "styled-components";

const AvatarImage = styled.img`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  margin-right: 6px;
  margin-left: -4px;
`

const ActiveFilterAvatar = ({ avatarImage }: any) => {
  return <AvatarImage src={`${avatarImage}?h=22&auto=format,compress`} className="avatar__img" alt="profile" />
}

export default ActiveFilterAvatar
