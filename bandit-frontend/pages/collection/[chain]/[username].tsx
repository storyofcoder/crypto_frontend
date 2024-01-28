import Collection from '../../../src/views/Collection'
import { dehydrate, QueryClient } from 'react-query'
import {  COLLECTION_DETAILS } from '../../../src/constant/queryKeys'
import { getCollectionDetailsData } from '../../../src/state/collections/helpers'

const CollectionPage = () => {
  return <Collection />
}

export async function getServerSideProps(context) {
  const { params, query } = context
  const { username } = params
  const { access_token } = query
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([COLLECTION_DETAILS, username], () =>
    getCollectionDetailsData(username.toLowerCase(), encodeURIComponent(access_token)),
  )

  const collection = await queryClient.getQueryData([COLLECTION_DETAILS, username])

  if(!collection.username){
    return {
      notFound: true
    }
  }


  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default CollectionPage
