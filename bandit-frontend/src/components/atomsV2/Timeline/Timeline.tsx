import React from 'react'
import { ItemContent, ItemStatus, ItemText, StyledList, StyledListItem, Track } from './styles'
import { CheckIcon } from '../../atoms/svg'
import { Text } from 'components/atoms/StyledSystem'
import BeatingIcon from '../../atoms/svg/beating'

export const STATES = {
  COMPLETE: 'COMPLETE',
  ACTIVE: 'ACTIVE',
  INCOMPLETE: 'INCOMPLETE',
} as const

const Timeline = ({ list }) => {
  return (
    <StyledList>
      {list.map(({ title, subtitle, state }, index) => (
        <StyledListItem>
          {index + 1 !== list.length && <Track completed={state === STATES.COMPLETE}/>}

          <ItemContent>
            <ItemStatus state={state}>
              {state === STATES.COMPLETE ? <CheckIcon /> : state === STATES.ACTIVE ? <BeatingIcon /> : null}
            </ItemStatus>
            <ItemText opacity={state === STATES.INCOMPLETE ? 0.6: 1}>
              <Text fontSize={14} color="text" fontWeight={700} lineHeight={1}>
                {title}
              </Text>
              <Text fontSize={12} color="textSubtle" fontWeight={400}>
                {subtitle}
              </Text>
            </ItemText>
          </ItemContent>
        </StyledListItem>
      ))}
    </StyledList>
  )
}

export default Timeline
