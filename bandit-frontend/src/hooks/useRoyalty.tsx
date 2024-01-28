import React, { useEffect, useState } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import BigNumber from "bignumber.js";
import useDecideContract from "./useDecideContract";
import { useExternalRoyaltyContract } from "./useContract";

const UseRoyalty = ({ contractAddress, tokenId, internalRoyalty }) => {
  const [royalty, setRoyalty] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { library } = useActiveWeb3React()
  const { initDecideContract } = useDecideContract()
  const { saleContract, auctionContract, isExternalContract } = initDecideContract(contractAddress)

  const externalRoyaltyContract = useExternalRoyaltyContract()

  const getRoyalty = async () => {
    setIsLoading(true)
    if (!isExternalContract) {
      const cr_decimal = new BigNumber(Number(internalRoyalty)).dividedBy(10 ** 8).toNumber()
      setRoyalty(cr_decimal)
    } else {
      try {
        const cr = await externalRoyaltyContract.getRoyalty(contractAddress)
        const cr_decimal = new BigNumber(cr.royalty.toNumber()).dividedBy(10 ** 8).toNumber()
        setRoyalty(cr_decimal)
      } catch (e) {
        console.log(e)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (contractAddress && library) {
      getRoyalty()
    }
  }, [contractAddress, library])
  return { ROYALTY: royalty, isLoading }
}

export default UseRoyalty
