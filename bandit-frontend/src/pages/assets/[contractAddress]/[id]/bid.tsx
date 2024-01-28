import PlaceBid from "../../../../views/placeBid";
import { dehydrate, QueryClient } from "react-query";
import { NFT_DETAIL } from "../../../../constant/queryKeys";
import { getNftDetailData } from "../../../../state/nfts/helpers";

export async function getServerSideProps(props) {
  const queryClient = new QueryClient()

  const { params } = props
  const { id, contractAddress } = params

  await queryClient.prefetchQuery([NFT_DETAIL, id, contractAddress], () => getNftDetailData(id, contractAddress))
  const nftDetails: any = queryClient.getQueryData([NFT_DETAIL, id, contractAddress])

  if (!nftDetails || nftDetails.saleType !== 'buy') {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const PlaceBidPage = () => {
  return <PlaceBid />
}

PlaceBidPage.requireAuth = true

export default PlaceBidPage
