import React from "react";
import { Box } from "../../components/atoms/StyledSystem";
import { useSelector } from "react-redux";

const FollowersList = ({ close }: any) => {
  const user = useSelector((state: any) => state.auth.user)

  return <Box>Following list</Box>
}

export default FollowersList
