import { dehydrate, QueryClient } from "react-query";

import { NFT_DETAIL } from "../../../../constant/queryKeys";
import { getNftDetailData } from "../../../../state/nfts/helpers";

import BuyToken from "../../../../views/BuyToken";

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

const BuyTokenPage = () => {
  return <BuyToken />
}

BuyTokenPage.requireAuth = true

export default BuyTokenPage
