import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Flex, Text } from '../../atoms/StyledSystem'
import { BackIcon, CrossIcon, DownIcon, FilterIcon } from "../../../components/atoms/svg";
import { toggleFilterOpen } from '../../../state/Settings/actions'
import { useWindowScrollPosition } from '../../../services/hooks'
import { NextLinkFromReactRouter } from '../../atoms/NextLink'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import Accordion from '../../atoms/Accordion/Accordion'
import DropDown from '../../atoms/Dropdown/Dropdown'
import ButtonMenu from '../../atomsV2/ButtonMenu/ButtonMenu'
import ButtonMenuItem from '../../atomsV2/ButtonMenu/ButtonMenuItem'
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints'
import { Button } from '../../atomsV2/Button'
import usePreviousValue from '../../../hooks/usePreviousValue'
import useTheme from '../../../hooks/useTheme'
import { Cross } from "recharts";

const DiscoverLayout = ({
  filterList = [],
  children,
  sortOptionList = [],
  selectedSort,
  listCount,
  activeFiltersListCount,
  onClickClear,
  showFrameView = true,
  renderTabs = null,
  tabsList = [],
}: any) => {
  const [filterOpen, setFilterOpen] = useState(true)
  // const filterOpen = useSelector((state: any) => state.settings.filterOpen)
  // const [lastScroll, setLastScroll] = useState(0)
  const { theme } = useTheme()
  const { top } = useWindowScrollPosition()
  const dispatch = useDispatch()
  const ContainerRef = useRef(null)
  const router = useRouter()
  const { pathname } = router
  const ref = useRef(null)
  const { isDesktop, isTablet } = useMatchBreakpoints()
  const lastScroll: any = usePreviousValue(top || 0)
  // const isScrollDown = top < ContainerRef?.current?.offsetTop
  const isScrollDown = top < 10

  const toggleFilter = () => {
    setFilterOpen(!filterOpen)
    // dispatch(toggleFilterOpen())
  }

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    if (filterOpen && !isDesktop) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'auto'
    }
  }, [filterOpen])

  useEffect(()=>{
      if(isDesktop){
        setFilterOpen(true)
      }
  },[isDesktop])

  // useEffect(() => {
  //   if (ref?.current?.style) {
  //     var b = 74
  //     if (isScrollDown || (lastScroll < top && top > b + b)) {
  //       ref.current.style.transform = `translateY(0px)`
  //     } else if (lastScroll > top && !(top <= b)) {
  //       ref.current.style.transform = `translateY(${b}px)`
  //     }
  //   }
  // }, [top, isScrollDown])

  const onClickNav = (e) => {
    Mixpanel.track(MixpanelEvents.NAV_LINK_CLICK, {
      id: e.target.innerText,
    })
  }

  const filterPosition = ref?.current?.offsetTop - 84 < top ? 'fixed' : 'sticky'

  return (
    <Container ref={ContainerRef}>
      <Wrapper>
        <FilterContainer filterOpen={filterOpen} marginTop={filterOpen && filterList.length ? '0px' : '100vh'}>
          <FilterContainer2>
            <Box p={'7px 5px 10px 0'}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="20px" fontWeight={500} color="text" lineHeight={1}>
                  Filter
                </Text>

                <IconWrapper onClick={toggleFilter} cursor="pointer">
                  <BackIcon iconColor={theme.colors.text} />
                </IconWrapper>
              </Flex>
              <TotalNFTCount>{listCount}</TotalNFTCount>
            </Box>

            <Box style={{ overflowY: 'auto', height: '76vh', paddingRight: "10px" }}>
              <Accordion list={filterList} />
            </Box>
            {filterOpen && (
              <FilterDoneButtonWrapper>
                <Button variant="secondary" scale="sm" onClick={onClickClear && onClickClear} mr={10}>
                  {' '}
                  Clear Filter{' '}
                </Button>

                <Button variant="primary" scale="sm" onClick={toggleFilter && toggleFilter} ml={10}>
                  Show
                </Button>
              </FilterDoneButtonWrapper>
            )}
          </FilterContainer2>
        </FilterContainer>
        {
          <ListContainer filterOpen={filterOpen}>
            <FilterWrapper ref={ref} filterOpen={filterOpen}>
              <Flex>
                {!filterOpen && !!filterList.length && (
                  <FilterSectionWrapper position={filterPosition}>
                    <FilterIconWrapper onClick={toggleFilter}>
                      <FilterIcon width={20} height={20} color={theme.colors.background} />
                      {/* <span>Filter</span> */}
                      {/* {!!activeFiltersListCount && activeFiltersListCount} */}
                    </FilterIconWrapper>
                  </FilterSectionWrapper>
                )}
                <NavigationTabs tabsList={tabsList} />
              </Flex>

              <Flex justifyContent="flex-end">
                <>
                  {/*<Box mr={10}>{!isMobile && showFrameView && <FrameView />}</Box>*/}
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
                            <span></span>
                            <DownIcon />
                          </Sort>
                        )}
                      />
                    </SortSectionWrapper>
                  )}
                </>
              </Flex>
            </FilterWrapper>
            <Box mt={20}>
              {React.Children.map(children, (child) => {
                return child && React.cloneElement(child, { filterOpen })
              })}
            </Box>
          </ListContainer>
        }
      </Wrapper>
    </Container>
  )
}

export const NavigationTabs = ({ tabsList }) => {
  if (!tabsList.length) return null
  return (
    <ButtonMenu activeIndex={tabsList.findIndex((item) => item.active)} scale="sm">
      {tabsList.map(({ to, title, disabled }, index) => (
        <ButtonMenuItem key={index} as={NextLinkFromReactRouter} to={disabled ? '' : to} disabled={disabled}>
          {title}
        </ButtonMenuItem>
      ))}
    </ButtonMenu>
  )
}

const FilterDoneButtonWrapper = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 20px 20px 20px;

  button {
    min-width: 100px;
    flex: 1;
  }

  ${(p) => p.theme.media.md} {
    display: none !important;
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
  .infinite-scroll-component {
    overflow: inherit !important;
  }
`
const FilterWrapper = styled(Flex)`
  position: relative;
  //top: 74px;
  //z-index: 4;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  // align-items: center;

  ${(p) => p.theme.media.xs} {
    grid-gap: 0;
    flex-direction: row !important;
    justify-content: ${(p) => (p.filterOpen ? 'space-between' : 'space-between')};
  }

  ${(p) => p.theme.media.md} {
    grid-gap: 0;
    flex-direction: row !important;
    justify-content: ${(p) => (p.filterOpen ? 'space-between' : 'space-between')};
  }
  ${(p) => p.theme.media.xlg} {
    flex-direction: row !important;
    justify-content: ${(p) => (p.filterOpen ? 'space-between' : 'space-between')};
  }
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
  //transition: width 0.2s linear;
`
const FilterContainer = styled(Box)`
  position: fixed;
  left: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 10000;
  width: 100vw;
  overflow: hidden;
  display: block;
  align-self: flex-start;
  transition: all 0.2s linear;
  transition-timing-function: cubic-bezier(0.21, 0.03, 0.03, 0.03);
  padding: 0 20px;
  height: ${({ filterOpen, isTablet }) => (filterOpen ? isTablet ? '95%' : '90%' : 0)};
  box-shadow: rgb(0, 0, 0, 0.09) 0 0 34px 0;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  //box-shadow: 0 5px 10px -2px #e7e5de;

  .ant-collapse-header {
    font-size: 16px;
    font-weight: 600;
    color: ${(p) => p.theme.colors.text};
  }

  ${(p) => p.theme.media.md} {
    position: sticky;
    top: 84px;
    background: transparent;
    width: ${({ filterOpen }) => (filterOpen ? '250px' : 0)};
    z-index: 3;
    padding: 0;
    transition: width 0.2s linear;
    box-shadow: none;
    margin-right: ${({ filterOpen }) => (filterOpen ? '5px;' : 0)};
  }
`

const FilterContainer2 = styled(Box)``
const ListContainer = styled(Box)`
  flex: 1;
  padding: 0;
  ${(p) => p.theme.media.md} {
    padding-left: ${({ filterOpen }) => (filterOpen ? '15px' : 0)};
  }
`
const FilterSectionWrapper = styled(Box)`
  //margin-right: auto;
  // min-width: 85px;
  z-index: 100;
  position: ${({ position }) => position};
  left: 40px;
  top: 84px;
`

const TabsNavListXs = styled(Flex)`
  margin-bottom: 20px;
  justify-content: center;

  ${(p) => p.theme.media.md} {
    display: none !important;
  }
`
const TabsNavListMd = styled(Box)`
  ${(p) => p.theme.media.xs} {
    display: none;
  }
  ${(p) => p.theme.media.sm} {
    display: none;
  }
  ${(p) => p.theme.media.md} {
    display: block;
  }
`
const TabNavList = styled(Flex)`
  .active-tab-link {
    opacity: 1;
    border-bottom: 2px solid rgba(0, 0, 0, 1);
    font-weight: 500;
  }
`
const TabNavLink = styled.span`
  padding: 4px 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  color: ${(p) => p.theme.colors.text};
  font-size: 14px;
  opacity: 0.6;

  &:hover {
    color: ${(p) => p.theme.colors.text};
  }
`

const FilterIconWrapper = styled(Box)`
  border-radius: 0 12px 12px 0;
  background: ${(p) => p.theme.colors.foreground};
  padding: 10px 8px;
  cursor: pointer;
  display: inline-flex;
  margin-left: -40px;

  svg {
    width: 20px;
    height: 20px;
  }
  // ${(p) => p.theme.media.xss} {
  //   margin-left: -20px;
  // }
  // ${(p) => p.theme.media.md} {
  //   margin-left: -40px;
  // }
  span {
    margin-left: 5px;
  }
`

const IconWrapper = styled(Box)`
  cursor: pointer;
  // background-color: ${(p) => p.theme.colors.bg1};
  border-radius: 50%;
  //height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SortSectionWrapper = styled.div`
  display: flex;
`

const Sort = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 10px 16px;
  background-color: transparent;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.colors.text};
  min-width: 195px !important;
  justify-content: space-between;

  &:hover {
    border-color: ${({ theme }) => theme.colors.foreground};
  }

  svg {
    path {
      //fill: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.textTertiary)};
    }
  }

  span {
    margin-left: 5px;
  }
  //
  //.sort-name {
  //  color: #7e7e7d;
  //  -webkit-line-clamp: 1;
  //  -webkit-box-orient: vertical;
  //  display: -webkit-box !important;
  //  white-space: normal;
  //  word-break: break-all;
  //  overflow: hidden;
  //}
`

export default DiscoverLayout
