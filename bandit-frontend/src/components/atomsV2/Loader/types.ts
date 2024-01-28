import { LayoutProps, SpaceProps } from 'styled-system'
import { PolymorphicComponentProps } from '../utils/polymorphic'

export const scales = {
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
} as const

export type Scale = typeof scales[keyof typeof scales]

export interface LoaderProps extends LayoutProps, SpaceProps {
  scale?: Scale
}
