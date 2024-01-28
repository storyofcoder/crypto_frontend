import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Text } from "../../../../components/atoms/StyledSystem";
import Accordion from "../../../../components/atoms/Accordion/Accordion";
import { BackIcon, CheckIcon, DownIcon } from "../../../../components/atoms/svg";
import DropDown from "../../../../components/atoms/Dropdown/Dropdown";
import { isMobile } from "react-device-detect";
import { toggleFilterOpen } from "../../../../state/Settings/actions";
import { useWindowScrollPosition } from "../../../../services/hooks";

const DiscoverLayout = ({
  filterList,
  children,
  sortOptionList = [],
  selectedSort,
  listCount,
  activeFiltersListCount,
  onClickClear,
  showFrameView = true,
}: any) => {
  // const [filterOpen, setFilterOpen] = useState(false);
  const filterOpen = useSelector((state: any) => state.settings.filterOpen)
  const [hideHeading, sethideHeading] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)
  const { top } = useWindowScrollPosition()
  const dispatch = useDispatch()
  const ContainerRef = useRef(null)
  const ref = useRef(null)
  const isScrollDown = top < ContainerRef?.current?.offsetTop

  const toggleFilter = () => {
    dispatch(toggleFilterOpen())
  }

  useEffect(() => {
    if (ref?.current?.style) {
      var b = 74
      if (isScrollDown || (lastScroll < top && top > b + b)) {
        ref.current.style.transform = `translateY(0px)`
      } else if (lastScroll > top && !(top <= b)) {
        ref.current.style.transform = `translateY(${b}px)`
      }
    }
    setLastScroll(top)
    if (!isScrollDown && !hideHeading) sethideHeading(true)
    else if (isScrollDown && hideHeading) sethideHeading(false)
  }, [top, isScrollDown])

  return (
    <Container ref={ContainerRef}>
      <Wrapper>
        <FilterContainer width={filterOpen ? (isMobile ? '100%' : '320px') : 0} height={filterOpen ? 'auto' : '0px'}>
          <FilterContainer2>
            <Box p={'20px 12px 10px 32px'}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="22px" fontWeight={700} color="text" lineHeight={1}>
                  Filter
                </Text>

                <IconWrapper onClick={toggleFilter} cursor="pointer">
                  <BackIcon />
                </IconWrapper>
              </Flex>
              <TotalNFTCount>{listCount}</TotalNFTCount>
            </Box>

            <Box p={'0px 16px 150px 16px'} style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
              <Accordion list={filterList} />
            </Box>
            {filterOpen && (
              <FilterDoneButtonWrapper>
                <div>
                  {!!activeFiltersListCount && (
                    <ClearFilter onClick={onClickClear && onClickClear}> Clear Filter </ClearFilter>
                  )}
                </div>

                <DoneFilter onClick={toggleFilter}>
                  <CheckIcon />
                </DoneFilter>
              </FilterDoneButtonWrapper>
            )}
          </FilterContainer2>
        </FilterContainer>
        {!(isMobile && filterOpen) && (
          <ListContainer paddingLeft={filterOpen ? '30px' : '0'}>
            <FilterWrapper ref={ref} alignItems="center" justifyContent="flex-end">
              <FilterSectionWrapper>
                {/* {!filterOpen && (
                  <FilterIconWrapper onClick={toggleFilter}>
                    <FilterIcon /> Filter{" "}
                    {!!activeFiltersListCount && activeFiltersListCount}
                  </FilterIconWrapper>
                )} */}
                <Text color="text" fontSize={[22, 22, 62]} fontWeight={600}>
                  {hideHeading ? ' ' : 'Collections'}
                </Text>
              </FilterSectionWrapper>
              <Flex justifyContent="flex-end">
                {/* <Box mr={10}>{!isMobile && showFrameView && <FrameView />}</Box> */}
                {!!sortOptionList.length && (
                  <SortSectionWrapper>
                    <DropDown
                      trigger={['click']}
                      placement="bottom"
                      optionList={sortOptionList}
                      customButton={() => (
                        <Sort>
                          {/* <SortIcon /> */}
                          {/* {!isMobile && <span>Sort by</span>} */}
                          <span className="sort-name">{selectedSort}</span>
                          <DownIcon />
                        </Sort>
                      )}
                    />
                  </SortSectionWrapper>
                )}
              </Flex>
            </FilterWrapper>
            {children}
          </ListContainer>
        )}
      </Wrapper>
    </Container>
  )
}
const FilterDoneButtonWrapper = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  padding: 10px 32px;
  display: none;
  position: fixed;
  bottom: 0;
  background-color: ${(p) => p.theme.colors.bg2};

  button {
    min-width: 100px;
  }

  ${(p) => p.theme.media.xs} {
    display: flex !important;
    align-items: center;
  }
`

const ClearFilter = styled(Text)`
  display: inline-block;
  color: ${(p) => p.theme.colors.text};
  margin-right: 10px;
  border-bottom: 1px solid ${(p) => p.theme.colors.text};
`
const DoneFilter = styled(Box)`
  border-radius: 50%;
  opacity: 0.7;
  background-color: ${(p) => p.theme.colors.text};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    path {
      fill: ${(p) => p.theme.colors.bg2};
    }
  }
`

const Container = styled(Box)`
  //transition: width 0.2s linear;
`
const FilterWrapper = styled(Flex)`
  position: sticky;
  top: 20px;
  z-index: 4;
  transition: all 0.5s;

  // ${(p) => p.theme.media.xxs} {
  //   flex-direction: column-reverse;
  // }
`

const TotalNFTCount = styled(Box)`
  display: inline-block;
  font-size: 12px;
  opacity: 0.8;
  font-weight: 400;
  color: ${(p) => p.theme.colors.text};
  ${(p) => p.theme.media.xs} {
  }
`

const Wrapper = styled(Box)`
  display: flex;
  position: relative;
  //transition: width 0.2s linear;
`
const FilterContainer = styled(Box)`
  // margin-top: 20px;
  background-color: ${(p) => p.theme.colors.bg2};
  width: ${(p) => p.width};
  overflow: hidden;
  position: sticky;
  display: block;
  top: 20px;
  left: 0px;
  align-self: flex-start;
  border-radius: 22px;
  transition: width 0.3s linear;
  transition-timing-function: cubic-bezier(0.21, 0.03, 0.03, 0.03);
  z-index: 5;
  box-shadow: 0 5px 10px -2px #e7e5de;

  .ant-collapse-header {
    font-size: 16px;
    font-weight: 600;
    color: ${(p) => p.theme.colors.text};
  }
  ${(p) => p.theme.media.xs} {
    transition: none !important;
    transition-timing-function: unset !important;
    width: ${(p) => (p.width ? 100 : 0)}vw;
    height: ${(p) => (p.width ? 100 : 0)}vh;
    top: ${(p) => (p.width ? 0 : 20)};
    position: ${(p) => (p.width ? 'fixed' : 'sticky')};
    z-index: ${(p) => (p.width ? 1000000 : 5)};
    border-radius: ${(p) => (p.width ? 0 : 22)}px;
  }
`

const FilterContainer2 = styled(Box)`
  // height: 90vh;
  // overflow-y: auto;
  position: relative;
  // ${(p) => p.theme.media.xs} {
  //  height: 100vh;
  // }
`
const ListContainer = styled(Box)`
  flex: 1;
`
const FilterSectionWrapper = styled(Box)`
  margin-right: auto;
  min-width: 85px;
  z-index: 100;
`

const FilterIconWrapper = styled(Box)`
  border-radius: 22px;
  background: ${(p) => p.theme.colors.bg2};
  color: ${(p) => p.theme.colors.text};
  padding: 7px 15px;
  font-size: 13px;
  cursor: pointer;
  min-width: 85px;
  margin-right: 10px;
  box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 10%);
  display: inline-block;

  svg {
    width: 20px;
    height: 20px;
  }
  ${(p) => p.theme.media.xs} {
    position: relative;
    top: -3px;
  }
`

const IconWrapper = styled(Box)`
  cursor: pointer;
  // background-color: ${(p) => p.theme.colors.bg1};
  border-radius: 50%;
  width: 57px;
  //height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 16px;
    width: 16px;
  }
`

const SortSectionWrapper = styled.div`
  display: flex;
  .ant-dropdown-trigger {
    // box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 10%);
    background: ${(p) => p.theme.colors.bg2};
  }
`

const Sort = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  padding: 10px 16px;
  color: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.textTertiary)};
  background-color: ${(p) => (p.active ? p.theme.colors.text4 : p.theme.colors.bg2)};
  border-radius: 16px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1px solid #E2E4E8;

  svg {
    path {
      fill: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.textTertiary)};
    }
  }

  span {
    margin-left: 5px;
  }

  .sort-name {
    color: #7e7e7d;
  }

  ${(p) => p.theme.media.xs} {
    margin-bottom: 10px;
    width: 100%;
  }
`

export default DiscoverLayout
