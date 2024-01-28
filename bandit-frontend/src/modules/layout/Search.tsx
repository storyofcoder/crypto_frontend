import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchInput from "../../components/atoms/Form/Search";
import algoliasearch from "algoliasearch/lite";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { Configure, connectAutoComplete, connectHits, Index, InstantSearch } from "react-instantsearch-dom";
import OutsideClickHandler from "react-outside-click-handler";
import cx from "classnames";

import styled from "styled-components";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import { isDefaultImage, truncateUsername } from "../../utils";
import BoringAvatar from "../../components/atoms/Avatar/BoringAvatar";
import SearchIcon from "../../components/atoms/svg/images/search";
import CloseIcon from "../../components/atoms/svg/images/close";
import config from "../../config/algolia";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";
import { useSelector } from "react-redux";
import { VerifiedIcon } from "../../components/atoms/svg";
import { NextLinkFromReactRouter } from "../../components/atoms/NextLink";
import { CHAIN_IDS_TO_NAMES_HYPHEN } from "constant/chains";

const algoliaClient = algoliasearch('UDJWNGOG3G', config.apiKey)

const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}

const SearchWidget = connectAutoComplete((props) => {
  const user = useSelector((state: any) => state.auth.user)

  const { currentRefinement, refine, onChange, value } = props
  const [active, setActive] = useState(false)
  const [showIcon, setShowIcon] = useState(true)
  const inputRef: any = useRef()

  function makeSearchActive() {
    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.OPEN_SEARCH)

    inputRef?.current?.focus()
    setActive(true)
    setShowIcon(false)
  }
  function makeSearchInActive() {
    setActive(false)
    setTimeout(() => {
      setShowIcon(true)
    }, 400)
  }

  function handleInput(value) {
    if (value === '') return
    Mixpanel.track(MixpanelEvents.SEARCH_EVENT, {
      Keyword: value,
    })
    refine(value)
  }

  const debouncedRefine = useCallback(debounce(handleInput, 500), [])

  function handleInputChange(e) {
    const value = e.currentTarget?.value
    onChange(value)
    debouncedRefine(value)
  }

  return (
    <>
      <SearchInput
        inputRef={inputRef}
        autoFocus
        value={value}
        onChange={handleInputChange}
        placeholder="Search NFT or people"
        onBlur={active ? makeSearchInActive : () => {}}
        className={cx('search-wrapper', { 'search-wrapper--active': active })}
      />
      {showIcon && (
        <SearchButtonIcon onClick={makeSearchActive}>
          <SearchIcon />
        </SearchButtonIcon>
      )}
    </>
  )
})

const SmallSearchWidget = connectAutoComplete((props) => {
  const { currentRefinement, refine, onChange, value } = props

  function handleInput(value) {
    if (value === '') return
    Mixpanel.track(MixpanelEvents.SEARCH_EVENT, {
      Keyword: value,
    })
    refine(value)
  }

  const debouncedRefine = useCallback(debounce(handleInput, 500), [])

  function handleInputChange(e) {
    const value = e.currentTarget?.value
    onChange(value)
    debouncedRefine(value)
  }

  return (
    <>
      <SearchInput
        inputRef={null}
        className=""
        value={value}
        onChange={handleInputChange}
        placeholder="Search by art name or creator"
      />
    </>
  )
})

const HitsWidget = connectHits(({ hits, widgetParams, hitComponent: HitComponent, title, onChangeHits }) => {
  useEffect(() => {
    if (onChangeHits) onChangeHits(hits.length)
  }, [hits])
  if (!hits.length) return null
  return (
    <div>
      <Text fontSize={18} mb={20} fontWeight={700}>
        {title}
      </Text>
      <Box ml={20}>
        {hits.map((hit, i) => (
          <HitComponent key={i} hit={hit} />
        ))}
      </Box>
    </div>
  )
})

const SearchResultWidget = () => {
  const [userHitsLength, setUserHitsLength] = useState(0)
  const [nftHitsLength, setNftHitsLength] = useState(0)
  const [collectionsHitsLength, setCollectionsHitsLength] = useState(0)

  function onChangeUserHits(length) {
    setUserHitsLength(length)
  }
  function onChangeNftHits(length) {
    setNftHitsLength(length)
  }
  function onChangeCollectionsHits(length) {
    setCollectionsHitsLength(length)
  }

  const noResult = userHitsLength + nftHitsLength + collectionsHitsLength === 0
  return (
    <SearchResults>
      <>
        <Index indexName={config.users}>
          <Configure hitsPerPage={3} />
          <HitsWidget hitComponent={UserHit} title="People" onChangeHits={onChangeUserHits} />
        </Index>
        <Index indexName={config.nft}>
          <Configure hitsPerPage={3} />
          <HitsWidget hitComponent={NftHit} title="NFT" onChangeHits={onChangeNftHits} />
        </Index>
        <Index indexName={config.collection}>
          <Configure hitsPerPage={3} />
          <HitsWidget hitComponent={CollectionHit} title="Collections" onChangeHits={onChangeCollectionsHits} />
        </Index>
      </>

      {noResult && <NoResults>No Search results.</NoResults>}
    </SearchResults>
  )
}

const MediaSmallSearch = () => {
  const [open, setOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [search, setSearch] = useState('')

  const { pathname } = useRouter()

  function handleOpen() {
    setOpen(!open)
  }

  function handleSearch(value) {
    setSearch(value)
    if (value.length > 0) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])
  return (
    <>
      <SearchIconWrapper onClick={handleOpen}>
        <SearchIcon />
      </SearchIconWrapper>

      {open && (
        <MediaSmallSearchView>
          <Flex alignItems="center">
            <SmallSearchWidget value={search} onChange={handleSearch} />
            <CloseIconWrapper onClick={handleOpen}>
              <CloseIcon />
            </CloseIconWrapper>
          </Flex>
          <SearchResultWidget />
        </MediaSmallSearchView>
      )}
    </>
  )
}

const Search = () => {
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)

  const { pathname } = useRouter()

  function handleSearch(value) {
    setSearch(value)
    if (value.length > 0) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  useEffect(() => {
    setShowResults(false)
    setSearch('')
  }, [pathname])

  function closeSearchResult() {
    setTimeout(() => {
      setShowResults(false)
      setSearch('')
    }, 200)
  }

  return (
    <SearchComponent onBlur={closeSearchResult}>
      <OutsideClickHandler onOutsideClick={() => {}}>
        <InstantSearch indexName={config.users} searchClient={searchClient}>
          <MediaLarge>
            <SearchWidget value={search} onChange={handleSearch} />

            {showResults && <SearchResultWidget />}
          </MediaLarge>
          <MediaSmall>
            <MediaSmallSearch />
          </MediaSmall>
        </InstantSearch>
      </OutsideClickHandler>
    </SearchComponent>
  )
}

const UserHit = ({ hit }) => (
  <NextLinkFromReactRouter to={`/${hit.raw.username}`}>
    <UserHitWrapper>
      <UserHitProfileWrapper>
        {!isDefaultImage(hit.raw.profileImage) ? (
          <img src={`${hit.raw.profileImage}?h=100&auto=format,compress`} alt="profile" />
        ) : (
          <BoringAvatar size={45} name={hit.raw.username} />
        )}
      </UserHitProfileWrapper>
      <UserHitInfoWrapper>
        <h2>
          {hit.raw.name} {hit.is_verified && <VerifiedIcon />}
        </h2>
        <h6>@{truncateUsername(hit.raw.username)}</h6>
      </UserHitInfoWrapper>
    </UserHitWrapper>
  </NextLinkFromReactRouter>
)

const NftHit = ({ hit }) => (
  <NextLinkFromReactRouter to={`/assets/${hit.tokenCreator}/${hit.id}`}>
    <NFTHitWrapper>
      <NFTHitImageWrapper>
        <img src={`${hit.metaData?.thumbnail}?h=100&auto=format,compress`} />
      </NFTHitImageWrapper>
      <NFTHitInfoWrapper>
        <h2>{hit.metaData?.name}</h2>
        <h6>@{truncateUsername(hit.tokenCreator)}</h6>
      </NFTHitInfoWrapper>
    </NFTHitWrapper>
  </NextLinkFromReactRouter>
)
const CollectionHit = ({ hit }) => (
  <NextLinkFromReactRouter to={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[hit?.raw?.chainId]}/${hit.raw.username}`}>
    <NFTHitWrapper>
      <NFTHitImageWrapper>
        <img src={`${hit.raw?.profileImage}?h=100&q=50&auto=format`} />
      </NFTHitImageWrapper>
      <NFTHitInfoWrapper>
        <h2>
          {hit.raw?.name}
          {hit.raw.isVerified && <VerifiedIcon />}
        </h2>
        <h6>@{truncateUsername(hit.raw.username)}</h6>
      </NFTHitInfoWrapper>
    </NFTHitWrapper>
  </NextLinkFromReactRouter>
)

const MediaLarge = styled(Box)`
  display: none;
  transition: all 0.3s ease;
  ${(p) => p.theme.media.xlg} {
    display: flex;
    justify-content: flex-end;
  }

  .search-wrapper {
    width: 0;
    opacity: 0;
    transition: all 0.3s linear;

    &--active {
      width: 100%;
      opacity: 1;
      margin: 0 20px;
    }
  }
`
const MediaSmall = styled(Box)`
  display: flex;
  ${(p) => p.theme.media.xlg} {
    display: none;
  }
`
const MediaSmallSearchView = styled(Box)`
  height: 100vh;
  width: 100vw;
  z-index: 1000000001;
  background-color: ${(p) => p.theme.colors.bg2};
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
`
const CloseIconWrapper = styled(Box)`
  margin-left: 30px;
  svg {
  }
`

const SearchButtonIcon = styled(Box)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.bg2};
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0px 2px 4px 0px rgb(0, 0, 0, .1);

  ${(p) => p.theme.media.xlg} {
    margin-left: 0;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const SearchIconWrapper = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.bg2};
  margin-left: auto;
  margin-right: 10px;

  ${(p) => p.theme.media.xlg} {
    margin-left: 0;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const SearchComponent = styled(Box)`
  position: relative;
  width: 90%;

  line-height: 100%;

  ${(p) => p.theme.media.xlg} {
    //margin: 0 50px;
  }

  input {
    width: 100%;
  }
`

const SearchResults = styled(Box)`
  position: absolute;
  top: 80px;
  left: 0;
  width: calc(100% - 40px);
  height: 100vh;
  //min-height: 20vh;
  background-color: ${(p) => p.theme.colors.bg2};
  box-shadow: ${(p) => p.theme.shadows[1]};
  border-radius: 10px;
  padding: 20px;
  display: block;
  overflow: auto;
  padding-bottom: 90px;
  margin-left: 20px;

  ${(p) => p.theme.media.xlg} {
    top: 50px;
    height: auto;
    max-height: 90vh;
    padding-bottom: 0;
    overflow-y: auto;
  }
  ${(p) => p.theme.media.xs} {
    width: calc(100% - 20px);
    box-shadow: none;
    border-radius: 0;
    padding-left: 0;
  }
`

const NoResults = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  padding: 30px 0;
`

const UserHitWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`

const UserHitProfileWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const UserHitInfoWrapper = styled.div`
  margin-left: 20px;
  flex: 1;
  min-width: 0;
  h2 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h6 {
    margin: 0;
    font-size: 14px;
  }
`

const NFTHitWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`

const NFTHitImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const NFTHitInfoWrapper = styled.div`
  margin-left: 20px;
  flex: 1;
  min-width: 0;
  h2 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h6 {
    margin: 0;
    font-size: 14px;
  }
`

export default Search
