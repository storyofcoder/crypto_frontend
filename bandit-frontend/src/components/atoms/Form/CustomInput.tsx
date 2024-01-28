import { InfoCircleOutlined } from '@ant-design/icons/lib/icons'
import { Popover } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import { Box, Text } from '../StyledSystem'

const InputContainer = styled(Box)`
  width: 100%;
  .text-danger {
    color: ${(p) => p.theme.colors.danger};
  }
`

const Input = styled.input`
  margin-bottom: 10px;
  width: 100% !important;
  padding: 12px 16px !important;
  outline: none;

  color: rgba(255, 255, 255, 0.8);

  font-feature-settings: 'clig' off, 'liga' off;
  /* Body/Regular/Bold */
  font-family: 'Neue Haas Grotesk Display Pro';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */

  border-radius: var(--borer-radius-12, 12px);
  border: 1px solid #363636;
  background: var(--surface-alpha-light-4, rgba(250, 250, 250, 0.04));
  border-bottom: 1px solid #9f8bff;

  &:disabled {
    opacity: 0.6;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  -moz-appearance: textfield;
`

const TextArea = styled.textarea`
  margin-bottom: 10px;
  width: 100% !important;
  min-height: 98px;
  border: none;
  border-radius: 26.5px;
  padding: 15.5px 20px !important;
  background-color: ${(p) => p.theme.colors.bg4};
  outline: none;
`

const Required = styled.span`
  color: ${(p) => p.theme.colors.danger};
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(calc(-50% - 5px));
`

const CustomInput = ({
  label,
  space = 0,
  type,
  errors,
  touched,
  required = false,
  popover,
  onChange,
  suffix = undefined,
  ...rest
}: any) => {
  const handleChange = (e) => {
    let _event = e
    _event.target.value = sanitizeString(_event.target.value)
    if (onChange) return onChange(_event)
  }

  function sanitizeString(input) {
    return (
      String(input)
        // .replace(/&/g, "&amp;")
        // .replace(/"/g, "&quot;")
        // .replace(/'/g, "&#39;")
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    )
  }

  const dateValidation = (currentDate) => {
    return currentDate.isAfter(moment(rest.minDate))
  }

  return (
    <InputContainer mb={[space]} className="custom-input-wrapper">
      {label && (
        <Text
          fontSize={[14]}
          mb={10}
          fontWeight={[500]}
          color="text"
          // ml={10}
        >
          {label} {required && <Required>*</Required>}
          {popover && (
            <Popover content={popover}>
              <InfoCircleOutlined
                style={{
                  position: 'relative',
                  left: '5px',
                  top: '-2px',
                  cursor: 'pointer',
                }}
              />
            </Popover>
          )}
        </Text>
      )}
      <InputWrapper>
        {(() => {
          switch (type) {
            case 'text':
            case 'password':
            case 'number':
              return <Input onChange={handleChange} type={type} {...rest} />
            case 'textarea':
              return <TextArea onChange={handleChange} {...rest} />
          }
        })()}
        {suffix && <IconWrapper>{suffix()}</IconWrapper>}
      </InputWrapper>

      {errors && errors[rest.name] && touched && touched[rest.name] && (
        <Box
          className="text-danger"
          //  ml={10}
        >
          {errors[rest.name]}
        </Box>
      )}
    </InputContainer>
  )
}

export default CustomInput
