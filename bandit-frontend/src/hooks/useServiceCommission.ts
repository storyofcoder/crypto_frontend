import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useDecideContract from "./useDecideContract";
import useActiveWeb3React from "./useActiveWeb3React";
import BigNumber from "bignumber.js";

const useServiceCommission = ({ contractAddress, saleType, creatorAddress }) => {
  const [isLoading, setIsLoading] = useState(true)

  const user = useSelector((state: any) => state.auth.user)
  const [serviceCommission, setServiceCommission] = useState(Number(user?.serviceCommission))

  const { library } = useActiveWeb3React()

  const { initDecideContract } = useDecideContract()
  const { saleContract, auctionContract, isExternalContract } = initDecideContract(contractAddress)

  const getCommission = async () => {
    setIsLoading(true)
    const contract = saleType === 'buy' ? saleContract : auctionContract
    const method = isExternalContract ? 'getPremiumCommision' : 'premiumCreatorCommision'
    const address = isExternalContract ? contractAddress : creatorAddress
    try {
      const sc = await contract[method](address)

      const sc_decimal = new BigNumber(sc.toNumber()).dividedBy(10 ** 8).toNumber()

      const sc_final = isExternalContract
        ? sc_decimal > 0
          ? sc_decimal
          : user?.serviceCommission
        : serviceCommission + sc_decimal
      setServiceCommission(sc_final)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)

      console.log(e)
    }
  }

  useEffect(() => {
    if (contractAddress && creatorAddress && saleType && library) {
      getCommission()
    }
  }, [contractAddress, creatorAddress, saleType, library])

  return { SERVICE_FEE: serviceCommission, isLoading }
}

export default useServiceCommission
