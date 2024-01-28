import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LargeGrid, SmallGrid } from "../../../components/atoms/svg";
import { setCardsDisplayFrame } from "../../../state/Settings/actions";

const FrameView = () => {
  const isSmallFrame = useSelector((state: any) => state.settings.isSmallFrame)
  const dispatch = useDispatch()

  const handleCardFrame = (isSmall) => {
    dispatch(setCardsDisplayFrame(isSmall))
  }

  return (
    <GridViewIconsWrapper>
      <GridViewIcons opacityVariable={!isSmallFrame} onClick={() => handleCardFrame({ isSmall: false })}>
        <LargeGrid />
      </GridViewIcons>
      <GridViewIcons opacityVariable={isSmallFrame} onClick={() => handleCardFrame({ isSmall: true })}>
        <SmallGrid />
      </GridViewIcons>
    </GridViewIconsWrapper>
  )
}

const GridViewIconsWrapper = styled.div`
  display: flex;
  margin-left: 10px;
  // display: inline-block;
  min-width: 50px;
  border: 1px solid #E2E4E8;
  border-radius: 16px;
  padding: 3px 11px;
  // box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 10%);
  background: ${(p) => p.theme.colors.bg2};
  ${(p) => p.theme.media.xs} {
    display: none;
  }
`

const GridViewIcons = styled.div`
  opacity: ${(p) => (p.opacityVariable ? 1 : 0.3)};
  cursor: pointer;
  padding: 5px 0;
  display: inline-block;
  display: flex;
`

export default FrameView
