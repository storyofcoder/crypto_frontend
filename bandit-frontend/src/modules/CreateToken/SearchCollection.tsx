import React, { useEffect, useState } from "react";
import API from "../../services/API";
import { useSelector } from "react-redux";
import Select from "../../components/atoms/Form/Select";
import styled from "styled-components";
import { Box } from "../../components/atoms/StyledSystem";
import { getNftAddress } from "../../utils/addressHelpers";

const SearchCollection = ({ onSelect, defaultValue = null, onClear }: any) => {
  const [collectionList, setCollectionList] = useState([])
  const [searchValue, setSearchValue] = useState(null)

  const { user } = useSelector((state: any) => state.auth)

  useEffect(() => {
    fetchCollections()
  }, [])

  function onChange(value) {
    const [collection] = collectionList.filter((u) => u.username === value)
    onSelect(collection)
    setSearchValue(null)
  }

  function onSearch(val) {
    setSearchValue(val)
  }

  async function fetchCollections() {
    try {
      const res = await API.getAllCollectionsFromUsername(user?.username)
      const list = res.filter((c) => !c.isExternalCollection && c?.contractAddress === getNftAddress())
      setCollectionList(list)
    } catch (e) {
      console.log(e)
    }
  }
  const getOptionLIst = () => {
    return collectionList.map(({ username }) => ({
      key: username,
      value: username,
    }))
  }
  return (
    <Wrapper>
      <Select
        style={{ width: '100%' }}
        placeholder="Search by collection name"
        optionFilterProp="children"
        onSelect={onChange}
        onSearch={onSearch}
        searchValue={searchValue}
        defaultValue={defaultValue}
        onClear={onClear && onClear}
        optionList={getOptionLIst()}
      />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  .ant-select {
    // border: none !important;
  }
`

export default SearchCollection
