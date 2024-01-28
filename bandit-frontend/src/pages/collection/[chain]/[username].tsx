import Collection from '../../../views/Collection'
import { dehydrate, QueryClient } from 'react-query'
import {  COLLECTION_DETAILS } from '../../../constant/queryKeys'
import { getCollectionDetailsData } from '../../../state/collections/helpers'

const CollectionPage = () => {
  return <Collection />
}

export async function getServerSideProps(context) {
  const { params } = context
  const { username } = params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([COLLECTION_DETAILS, username], () =>
    getCollectionDetailsData(username.toLowerCase()),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default CollectionPage
