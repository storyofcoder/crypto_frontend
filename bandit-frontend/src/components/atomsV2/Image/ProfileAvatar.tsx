import React from "react";
import styled from "styled-components";
import BackgroundImage from "./BackgroundImage";
import { BackgroundImageProps } from "./types";
import BoringAvatar from "../../atoms/Avatar/BoringAvatar";

const StyledProfileAvatar = styled(BackgroundImage)`
  border-radius: 50%;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.backgroundDisabled}; ;
`

export interface ProfileAvatarProps extends BackgroundImageProps {
  walletAddress: string
  src?: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = (props) =>
  props.src ? (
    <StyledProfileAvatar loadingPlaceholder={<Placeholder />} {...props} />
  ) : (
    <BoringAvatar size={props.width} name={props.walletAddress} />
  )

export default ProfileAvatar
