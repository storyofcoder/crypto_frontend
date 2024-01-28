import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from '../StyledSystem'
import { MinusIcon, PlusIcon } from '../../../components/atoms/svg'
import { pad } from '../../../utils'

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  //background-color: ${(p) => p.theme.colors.grey400};
  height: 50px;
  border-radius: 12px;
`
const CounterButtons = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 12px;
  border: none;
  //background-color: ${(p) => p.theme.colors.grey600};
  border: 1px solid ${(p) => p.theme.colors.border};
  pointer-events: ${(p) => (p.disabled ? 'none' : 'unset')};
  opacity: ${(p) => (p.disabled ? '0.5' : '1')};

  &:active {
    border: 1px solid ${(p) => p.theme.colors.foreground};
  }

  svg {
    path {
      fill: ${(p) => p.theme.colors.foreground};
    }
  }
`

const View = styled.input`
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  min-width: 60px;
  user-select: none;
  border: none;
  box-shadow: none;
  border-radius: 12px;
  padding: 0 10px;
  margin: 0 10px;
  max-width: 80px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  text-align: center;

  &:active,
  &:focus,
  &:focus-visible {
    border: none;
    box-shadow: none;
    outline: none;
  }
`

const Counter = ({ initialState = 1, maxState, onChange, value }: any) => {
  const [counter, setCounter] = useState(initialState)

  useEffect(() => {
    onChange(counter)
  }, [counter])

  useEffect(() => {
    setCounter(initialState)
  }, [initialState])

  const onChangeInput = (e) => {
    const value = Number(e.target.value)
    setCounter(value)
  }

  const handleDecrement = () => {
    if (value > initialState) {
      setCounter((_value) => value - 1)
    }
  }
  const handleIncrement = () => {
    if (maxState) {
      if (value < maxState) {
        setCounter((_value) => value + 1)
      }
    } else {
      setCounter((_value) => value + 1)
    }
  }

  return (
    <Flex flexDirection="column" alignItems="flex-end">
      <Container>
        <CounterButtons onClick={handleDecrement} disabled={value === 1}>
          <MinusIcon />
        </CounterButtons>

        <View value={value} onChange={onChangeInput} />
        <CounterButtons onClick={handleIncrement} disabled={maxState === value || !maxState}>
          <PlusIcon />
        </CounterButtons>
      </Container>
      {((maxState > 0 && value > maxState) || counter < 1) && (
        <Text fontSize={12} mt={10} color="#E11900">
          Enter quantity between 1 to {maxState}
        </Text>
      )}
    </Flex>
  )
}

export default Counter
