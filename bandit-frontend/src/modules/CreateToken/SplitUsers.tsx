import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isDefaultImage, truncateUsername } from "../../utils";
import BoringAvatar from "../../components/atoms/Avatar/BoringAvatar";
import CustomSlider from "../../components/atoms/Slider/slider";
import { CrossIcon } from "../../components/atoms/svg";
import { Box, Flex } from "../../components/atoms/StyledSystem";

const SplitUsers = (props) => {
  const { user, percentage, maxValue, onChangeUserRoyalty, complete, removeUser, disableRemove } = props
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(percentage)
  }, [percentage])
  function handleChange(val) {
    setValue(val)
    onChangeUserRoyalty(user, val)
  }
  return (
    <SplitUserContainer>
      <Flex flex={2} alignItems="center">
        <Box className="profile-image">
          {!isDefaultImage(user.profileImage) ? (
            <img src={user.profileImage} alt="profile" />
          ) : (
            <BoringAvatar size={30} name={user.username} />
          )}
        </Box>
        <div className="username">{truncateUsername(user.username)}</div>
      </Flex>
      <Flex flex={3} alignItems="center">
        <Box className="slider">
          <CustomSlider min={0} max={maxValue} onChange={handleChange} value={value} />
        </Box>
        <div className="percentage">{percentage}%</div>
        <div className="cancel">
          {!disableRemove && (
            <span onClick={removeUser}>
              <CrossIcon />
            </span>
          )}
        </div>
      </Flex>
    </SplitUserContainer>
  )
}

const SplitUserContainer = styled(Flex)`
  align-items: center;
  margin: 10px 0;

  ${(p) => p.theme.media.xs} {
    display: block;
  }
  ${(p) => p.theme.media.sm} {
    display: flex;
  }

  .profile-image {
    width: 42px;
    height: 42px;
    overflow: hidden;

    img,
    svg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .username {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    color: ${(p) => p.theme.colors.text};
  }

  .slider {
    flex: 1;
  }

  .percentage {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
    font-weight: 800;
    background-color: ${(p) => p.theme.colors.bg1};
    color: ${(p) => p.theme.colors.text};
    border-radius: 20px;
  }
  .cancel {
    margin-left: 10px;
    cursor: pointer;
    width: 12px;
    height: 12px;
    display: flex;

    svg {
      height: 100%;
      width: 100%;
    }
  }
`

export default SplitUsers
