import React, { useState } from 'react'
import Countdown from 'react-countdown'
import moment from 'moment'
import { Box, Flex, Text } from 'components/atoms/StyledSystem'
import { pad } from 'utils'

const Timer = ({ endTime, onComplete }) => {
  const [state, setState] = useState(0)
  const onTick = () => {
    setState(state + 1)
  }
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if(completed){
      onComplete && onComplete();
      return null
    }
    const renderBlock = (title, subtitle) => {
      return (
        <Flex flexDirection="column" alignItems="center" mr={20} width={[50, 50, 80]}>
          <Text fontSize={[22,22,60]} fontWeight={600} color="text" lineHeight={1}>
            {pad(title, 2)}
          </Text>
          <Text fontSize={[14]} fontWeight={500} color="text">
            {subtitle}
          </Text>
        </Flex>
      )
    }
    return (
      <Flex width="100%" justifyContent="center">
        {renderBlock(days, 'Days')}
        {renderBlock(hours, 'Hours')}
        {renderBlock(minutes, 'Minutes')}
        {renderBlock(seconds, 'Seconds')}
      </Flex>
    )
  }
  return (
    <div>
      <Countdown key={state} date={moment.unix(endTime).toDate()} renderer={renderer} onTick={onTick} />
    </div>
  )
}

export default Timer
