import React, { useEffect, useState } from 'react'
import DiscoverLayout from '../components/molecules/AppLayout/DiscoverLayout'
import CollectionCardGrid from '../modules/Collections/launchpad/CollectionsList/CollectionCardGrid'

import FiltersTemplate from '../components/molecules/Filters/FiltersTemplate'
import queryString from 'query-string'
import { useRouter } from 'next/router'
import { PageMeta } from '../components/molecules/AppLayout/PageMeta'
import { COLLECTIONS } from '../constant/queryKeys'
import { getAllCollectionsData } from '../state/collections/helpers'
import Page from '../components/atomsV2/Page'
import mint from '../components/atoms/svg/activity/mint'
import ChainFilterTemplete from 'components/molecules/Filters/ChainFilterTemplate'

const SORT_NAMES = {
  'trending-desc': 'Trending',
  'top-desc': 'Top',
}

const Collections = () => {
  // const [sort, setSort] = useState({ name: 'trending', order: 'desc' })
  const [sort, setSort] = useState({
    name: 'launchDate',
    order: 'asc',
  })
  const [selectedSort, setSelectedSort] = useState('Trending')
  const [askRefresh, setAskRefresh] = useState(0)
  const [collectionStatus, setCollectionStatus] = useState([])
  const [mintingType, setMintingType] = useState([])
  const [selectedChain, setSelectedChain] = useState([])
  const [parsingUrl, setParsingUrl] = useState(true)

  const router = useRouter()
  const { asPath, pathname } = useRouter()
  const search = asPath?.replace(pathname, '')

  const filter = [
    {
      name: 'collectionStatus',
      filter: collectionStatus,
    },
    {
      name: 'mintingType',
      filter: mintingType,
    },
    {
      name: 'chain',
      filter: selectedChain,
    },
  ]

  useEffect(() => {
    if (!parsingUrl) {
      setAskRefresh(askRefresh + 1)
    }
  }, [search, parsingUrl])

  useEffect(() => {
    if (!parsingUrl) {
      handleFilters()
    }
  }, [collectionStatus.length, mintingType.length, selectedChain.length, parsingUrl])

  useEffect(() => {
    setParsingUrl(true)
    const parsed = queryString.parse(search, {
      arrayFormat: 'comma',
    })
    const { sort, collectionStatus, price, chains }: any = parsed || {}
    // if (sort) {
    //   const [name, order] = sort.split('-')
    //   setSort({ name, order })
    //   setSelectedSort(SORT_NAMES[sort])
    // }

    if (collectionStatus) {
      const _collectionStatus = Array.isArray(collectionStatus) ? collectionStatus : [collectionStatus]
      setCollectionStatus(_collectionStatus)
    }

    if (mintingType) {
      const _mintingType = Array.isArray(mintingType) ? mintingType : [mintingType]
      setMintingType(_mintingType)
    }

    if (chains) {
      const _chains = Array.isArray(chains) ? chains : [chains]
      setSelectedChain(_chains)
    }

    setParsingUrl(false)
  }, [])

  const handleFilters = () => {
    let parsed = queryString.parse(decodeURIComponent(search))

    // if (sort) {
    //   parsed.sort = [`${sort.name}-${sort.order}`]
    // } else {
    //   delete parsed.sort
    // }

    if (!!collectionStatus.length) {
      parsed.collectionStatus = collectionStatus
    } else {
      delete parsed.collectionStatus
    }

    if (!!mintingType.length) {
      parsed.price = mintingType
    } else {
      delete parsed.price
    }

    if (!!selectedChain.length) {
      parsed.chains = selectedChain
    } else {
      delete parsed.chains
    }

    const stringify = queryString.stringify(parsed, { arrayFormat: 'comma' })

    router.replace({
      search: !!stringify ? `?${stringify}` : '',
    })
  }

  function onClickCollectionStatus(state) {
    if (collectionStatus.includes(state)) {
      setCollectionStatus(collectionStatus.filter((c) => c !== state))
    } else {
      setCollectionStatus([...collectionStatus, state])
    }
  }
  function onClickMintingType(state) {
    if (mintingType.includes(state)) {
      setMintingType(mintingType.filter((c) => c !== state))
    } else {
      setMintingType([...mintingType, state])
    }
  }

  const onClickChainFilter = (state) => {
    if (selectedChain.includes(state)) {
      setSelectedChain(selectedChain.filter((c) => c !== state))
    } else {
      setSelectedChain([...selectedChain, state])
    }
  }

  const handleSort = (title, name, order) => {
    setSort({
      name,
      order,
    })
    setSelectedSort(title)
    setAskRefresh(askRefresh + 1)
  }

  const fetchCollections = (limit, offset) => {
    const _sort =
      collectionStatus.length === 1 && collectionStatus.includes('ongoing')
        ? {
            ...sort,
            order: 'desc',
          }
        : sort
    return getAllCollectionsData(offset, limit, _sort, filter)
  }

  return (
    <Page>
      <PageMeta />
      <DiscoverLayout
        filterList={[
          {
            title: 'Status',
            render: () => (
              <FiltersTemplate
                pillList={[
                  {
                    name: 'Live minting',
                    onClick: () => onClickCollectionStatus('ongoing'),
                    active: collectionStatus.includes('ongoing'),
                  },
                  {
                    name: 'Upcoming',
                    onClick: () => onClickCollectionStatus('upcoming'),
                    active: collectionStatus.includes('upcoming'),
                  },
                ]}
              />
            ),
          },
          {
            title: 'Price',
            render: () => (
              <FiltersTemplate
                pillList={[
                  {
                    name: 'Free Mint',
                    onClick: () => onClickMintingType('free'),
                    active: mintingType.includes('free'),
                  },
                ]}
              />
            ),
          },
          {
            title: 'Chains',
            render: () => <ChainFilterTemplete onClick={onClickChainFilter} selectedChain={selectedChain} />,
          },
        ]}
        sortOptionList={[]}
        selectedSort={selectedSort}
        // listCount={`Found (${
        //     pages[pages.length - 1]?.totalResult || 0
        // } results)`}
        // activeFiltersListCount={activeFiltersList?.length}
        // onClickClear={onClickClear}
        // tabsList={tabsList}
      >
        <CollectionCardGrid type={[COLLECTIONS]} fetchData={fetchCollections} askRefresh={askRefresh} />
      </DiscoverLayout>
    </Page>
  )
}

export default Collections
