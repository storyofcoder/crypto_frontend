import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Flex } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import UserDropDown from "../profile/UserDropDown";
import { setUser } from "../../state/Auth/actions";
import styled from "styled-components";

const StyledButton = styled(Button)`
  ${(p) => p.theme.media.xs} {
    display: none;
  }
`

const HeaderRightNav = (props) => {
  const dispatch = useDispatch()
  // const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      dispatch(setUser(userData))
    }
  }, [])
  return (
    <Flex alignItems="center">
      <UserDropDown />
    </Flex>
  )
}

export default HeaderRightNav
