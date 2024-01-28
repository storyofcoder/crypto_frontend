import React, { useState } from "react";
import { Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import Loader from "../../components/atoms/Loader/Loader";

const TxLoading = ({ close, title, callback }: any) => {
  const [loading, setLoading] = useState(false)

  async function confirm() {
    setLoading(true)
    try {
      const notClosing = await callback()
      setLoading(false)
      if (!notClosing) {
        close()
      }
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {!loading ? (
        <>
          <Text fontSize="20px" fontWeight="600" mb={'5px'} textAlign="center">
            {title}
          </Text>
          <Button variant="secondary" onClick={confirm}>
            Confirm
          </Button>
          <Text style={{ cursor: 'pointer' }} onClick={close} mt={10}>
            Cancel
          </Text>
        </>
      ) : (
        <>
          <Loader />
          <Text fontSize="20px" fontWeight="600" textAlign="center">
            Please accept the transaction request.
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20} textAlign="center">
            Please do not refresh the page.
          </Text>
        </>
      )}
    </Flex>
  )
}

export default TxLoading
