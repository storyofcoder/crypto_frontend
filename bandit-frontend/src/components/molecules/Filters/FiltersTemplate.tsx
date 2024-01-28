import React from "react";
import { Box } from "../../atoms/StyledSystem";
import Pill from "../../atoms/Pill/FilterPill";
import styled from "styled-components";

const FiltersTemplate = ({ title, pillList }: any) => {
  return (
    <Box>
      {/*<Text*/}
      {/*  fontSize={14}*/}
      {/*  fontWeight={600}*/}
      {/*  mb={10}*/}
      {/*  opacity={0.6}*/}
      {/*  color="textTertiary"*/}
      {/*  fontFamily="roc-grotesk"*/}
      {/*>*/}
      {/*  {title}*/}
      {/*</Text>*/}
      <GridView>
        {pillList.map((props) => (
          <Pill key={props.name} {...props} />
        ))}
      </GridView>
    </Box>
  )
}

const GridView = styled.div`
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  max-height: 200px;
  overflow: auto;
`

export default FiltersTemplate
