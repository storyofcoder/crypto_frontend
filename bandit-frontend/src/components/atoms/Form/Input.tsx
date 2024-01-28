import React from "react";
import { Input, InputNumber } from "antd";
import { Box, Text } from "../StyledSystem";

const { TextArea, Password } = Input

const CustomInput = ({ label, helperText, space = 0, type, suffix, ...rest }: any) => {
  return (
    <Box mb={[space]}>
      {label && (
        <Text fontSize={[14]} mb={10} fontWeight={[600]}>
          {label}
        </Text>
      )}
      {(() => {
        switch (type) {
          case 'text':
            return <Input {...rest} />
          case 'textarea':
            return <TextArea {...rest} />
          case 'password':
            return <Password {...rest} />
          case 'number':
            return <InputNumber {...rest} />
        }
      })()}
      {helperText && <Text fontSize={[14]}>{helperText}</Text>}
    </Box>
  )
}

export default CustomInput
