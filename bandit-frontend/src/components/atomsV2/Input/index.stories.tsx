import React from "react";
import styled from "styled-components";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import Search from "../../atoms/svg/images/search";
import Input from "./Input";
import InputGroup from "./InputGroup";
import { scales } from "./types";
import { Box, Text } from "../../atoms/StyledSystem";

const Row = styled.div`
  display: flex;
  margin-bottom: 32px;
`

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
} as Meta

export const Default: React.FC = () => {
  return (
    <div>
      {Object.keys(scales).map((key) => (
        <Box mb={40}>
          <Text>{key}</Text>
          <Input type="text" scale={scales[key]} value="Value" />
          <Input type="text" scale={scales[key]} placeholder="Placeholder..." mt={16} />
          <Input type="text" scale={scales[key]} value="Disabled" disabled mt={16} />
          <Input type="text" scale={scales[key]} value="Success" isSuccess mt={16} />
          <Input type="text" scale={scales[key]} value="Warning" isWarning mt={16} />
        </Box>
      ))}
    </div>
  )
}

export const Icons: React.FC = () => {
  return (
    <Box width="300px">
      <InputGroup startIcon={<Search width="18px" />} mb="24px" scale="sm">
        <Input type="text" value="Input Group" />
      </InputGroup>
      <InputGroup startIcon={<Search width="24px" />} mb="24px" scale="md">
        <Input type="text" value="Input Group" />
      </InputGroup>
      <InputGroup startIcon={<Search width="32px" />} mb="24px" scale="lg">
        <Input type="text" value="Input Group" />
      </InputGroup>
    </Box>
  )
}
