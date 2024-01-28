import styled from 'styled-components'
import { STATES } from './Timeline'

export const StyledList = styled.ol`
  list-style: none;
`
export const StyledListItem = styled.li`
  position: relative;
  padding-bottom: 40px;
`
export const ItemContent = styled.div`
  display: flex;
  align-items: flex-start;
`
export const Track = styled.div<any>`
  position: absolute;
  top: 16px;
  left: 17px;
  margin-top: 2px;
  width: 2px;
  background-color: ${({ theme, completed }) => completed ? theme.colors.primary : theme.colors.grey400};
  height: 100%;
`
export const ItemStatus = styled.span<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: ${({ theme, state }) => state === STATES.COMPLETE ? theme.colors.primary : theme.colors.background};
  border: 2px solid;
  border-color: ${({ theme, state }) => state === STATES.INCOMPLETE ? theme.colors.grey400 : theme.colors.primary};;
  z-index: 1;
`
export const ItemText = styled.span<any>`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  opacity: ${(p)=>p.opacity}
`
