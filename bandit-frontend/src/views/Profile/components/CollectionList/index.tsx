import { Flex, Box } from 'components/atoms/StyledSystem'
import React from 'react'
import DiscoverLayout from '../../../../components/molecules/AppLayout/DiscoverLayout'
import { USER_COLLECTIONS } from '../../../../constant/queryKeys'
import CollectionCardGrid from '../../../../modules/Collections/launchpad/CollectionsList/CollectionCardGrid'
import { Button } from '../../../../components/atomsV2/Button'
import { NextLinkFromReactRouter } from '../../../../components/atoms/NextLink'
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React'
import { getUserCollectionsData } from "../../../../state/collections/helpers";

const CollectionList = ({ tabsList }) => {
  const { account } = useActiveWeb3React()
  async function fetchUserCollections(limit, offset) {
    return getUserCollectionsData(account, { limit, offset })
  }
  return (
    <DiscoverLayout tabsList={tabsList}>
      <Flex justifyContent="flex-end" width="100%" mb={20}>
        <Button as={NextLinkFromReactRouter} to="/create-collection" variant="primary" scale="sm">
          Create Collection
        </Button>
      </Flex>
      <CollectionCardGrid type={USER_COLLECTIONS} fetchData={fetchUserCollections} cardType="DETAILS" />
    </DiscoverLayout>
  )
}

export default CollectionList
