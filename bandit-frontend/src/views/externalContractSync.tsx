import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import locale from "../constant/locale";
import { Box } from "../components/atoms/StyledSystem";

const ExternalContractSync = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const { query } = useRouter()

  const { contractAddress }: any = query

  useEffect(() => {
    const syncExternalContract = async () => {
      setLoading(true)

      const endPoint = locale.ADMIN_API_END_POINT
      try {
        const res = await axios.get(`${endPoint}/webhook?address=${contractAddress}`)
        setLoading(false)
        setSuccess(true)
      } catch (e) {
        setLoading(false)
      }
    }

    setLoading(true)
    setTimeout(syncExternalContract, 2000)
  }, [])
  return (
    <Container>
      {loading && <h6>Loading...</h6>}
      {success && <h6>Success...</h6>}
    </Container>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  ${(p) => p.theme.media.xs} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 10px 40px 40px 40px;
    //max-width: var(--max-width);
    margin: 0 auto;
  }
`

export default ExternalContractSync
