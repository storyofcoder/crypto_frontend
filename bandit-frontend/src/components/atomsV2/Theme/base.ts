export const breakpointMap: { [key: string]: number } = {
  xss: 376,
  xs: 576,
  sm: 852,
  md: 968,
  lg: 1080,
  xlg: 1200,
}

const breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`)

const media = {
  xss: `@media screen and (min-width: ${breakpointMap.xss}px)`,
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xlg: `@media screen and (min-width: ${breakpointMap.xlg}px)`,
}

export const shadows = {
  success: '0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px #BDF0E0',
  warning: '0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px #FFDFDF',
}

const spacing = [0, 4, 8, 16, 24, 32, 48, 64]

const radii = {
  small: '4px',
  default: '12px',
  card: '24px',
  circle: '50%',
}

const zIndices = {
  dropdown: 10,
  modal: 100,
}

export default {
  siteWidthSmall: 1280,
  siteWidthLarge: 1440,
  breakpoints,
  media,
  spacing,
  shadows,
  radii,
  zIndices,
  zIndexes: [0, 1, 2, 3, 500, 9000, 10000, 100001, 100002],
}
