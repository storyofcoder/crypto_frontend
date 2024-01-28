import styled from "styled-components";

const Placeholder = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: ${({theme})=>theme.colors.backgroundDisabled};
`;

export default Placeholder;
