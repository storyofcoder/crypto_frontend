const fontSizes: any = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 40]
fontSizes.micro = fontSizes[0]
fontSizes.microSecondary = fontSizes[1]
fontSizes.mini = fontSizes[2]
fontSizes.base = fontSizes[3]
fontSizes.medium = fontSizes[4]
fontSizes.largeSmall = fontSizes[5]
fontSizes.largeMedium = fontSizes[6]
fontSizes.large = fontSizes[7]
fontSizes.xLarge = fontSizes[8]
fontSizes.xxLarge = fontSizes[9]
fontSizes.xxxLarge = fontSizes[10]
fontSizes.huge = fontSizes[11]

const lineHeights = {
  solid: 1,
  title: 1.25,
  copy: 1.5,
  copyExtra: 1.6,
  copyLarge: 1.71,
  titleLarge: 1.33,
  extra: 1.8,
  double: 2,
  super: 3,
}

const sizes: any = [16, 32, 48, 64, 128]
sizes.mini = sizes[0]
sizes.small = sizes[1]
sizes.regular = sizes[2]
sizes.large = sizes[4]
sizes.huge = sizes[5]

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

const breakpoints: any = ['376px', '576px', '576px', '786px', '992px', '1200px']
breakpoints.xxs = breakpoints[0]
breakpoints.xs = breakpoints[1]
breakpoints.sm = breakpoints[2]
breakpoints.md = breakpoints[3]
breakpoints.lg = breakpoints[4]
breakpoints.xlg = breakpoints[5]

const colors = {
  primary: '#EC5F55',
  primaryDark: '#e84f44',
  green80: '#1cc886',
  purple: '#342a80',
  darkPurple: '#10003e',
  blueDark: '#202b45',
  darkGrey: '#79808f',
  blueDarker: '#222d46',
  blueDarker70: '#222d4670',
  white10: 'rgba(255,255,255,0.1)',
  white50: '#ffffff50',
  grey10: '#f4f4f5',
  green90: '#1dc886',
  grey20: '#f2f2f2',
  grey30: '#d2d5da',
  grey40: '#f9f8fb',
  darkGrey90: '#79808f90',
  darkGrey20: '#79808f40',
}

const variables = {
  bg1: '#efeeea',
  bg1Light: '#FBFBF9',

  bg2: '#ffffff',
  bg3: '#f1f3f6',
  bg4: '#F3F3F0',
  bg5: '#E3E2DF',

  text: '#000000',
  textLight: '#292C36',
  textSecondary: '#a67b5b',
  textTertiary: '#11110F',
  text4: '#9A4FFA',
  text5: '#B530A6',
  text6: '#70706F',
  danger: '#E25D5C',
}

export const xxs = () => `@media (max-width: ${breakpoints.xxs})`
export const xs = () => `@media (max-width: ${breakpoints.xs})`
export const sm = () => `@media (min-width: ${breakpoints.sm})`
export const md = () => `@media (min-width: ${breakpoints.md})`
export const lg = () => `@media (min-width: ${breakpoints.lg})`
export const xlg = () => `@media (min-width: ${breakpoints.xlg})`

const shadows = [
  '0 11px 32px 0 rgba(52, 42, 128, 0.2)', // Index in course card
  ' 0 4px 10px 0 rgba(0, 0, 0, 0.06)', // Card's shadow in dashboard
  '0 10px 30px 0 rgba(52, 42, 128, 0.2)', // Step Circular Text
  '0 1px 0 0 #e9ebed', // Chapter header
  '0 30px 40px 0 rgba(210, 213, 218, 0.2)', // Chapter content
  // these are dummy values.
  '0 0 12px 0 rgba(72, 90, 206, 0.16)',
  '0 0 31px 0 rgba(72, 90, 206, 0.25)',
  '0 0 12px 0 rgba(72, 90, 206, 0.3)',
  '0 0 12px 0 rgba(72, 90, 206, 0.7)',
  '0 0 6px 0 rgba(0, 0, 0, 0.48)',
  '0 -3px 6px 0 rgba(72, 90, 206, 0.16)',
  '0 30px 40px 0 rgba(51, 31, 120, 0.06)',
]

const radii = [0, 2, 4, 8, 16, 9999, '50%', '100%']
const borders = [
  0,
  '1px solid',
  '2px solid',
  '4px solid',
  '8px solid',
  '16px solid',
  '32px solid',
  '0.5px solid',
  '1px dashed',
  '2px dashed',
]

export const buttons = {
  primary: {
    border: 'none',
    backgroundColor: variables.bg2,
    color: variables.text,
    borderRadius: radii[5],
    fontSize: fontSizes[3],
    fontWeight: fontWeights.semibold,
    '&:hover': {
      border: 'none',
      color: variables.text,
      backgroundColor: '#FBFBF9',
    },
    '&:focus': {
      border: 'none',
      color: variables.text,
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    color: variables.text,
    borderRadius: radii[5],
    fontSize: fontSizes[2],
    fontWeight: fontWeights.medium,
    border: borders[2],
    '&:hover': {
      color: variables.text,
      backgroundColor: 'transparent',
      border: borders[2] + ' rgba(17, 17, 15, 0.5)',
    },
    '&:focus': {
      border: borders[2],
      borderColor: variables.text,
      color: variables.text,
      backgroundColor: 'transparent',
    },
  },
  tertiary: {
    border: 'solid 2px transparent',
    backgroundColor: 'transparent',
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0),rgba(255, 255, 255, 0)),linear-gradient(101deg, #5191d5, #d31297)',
    color: variables.text,
    borderRadius: radii[5],
    fontSize: fontSizes[3],
    fontWeight: fontWeights.medium,
    backgroundOrigin: ' border-box',
    backgroundClip: 'content-box, border-box',
    boxShadow: `2px 1000px 1px ${variables.bg1} inset`,
    '&:hover , &:active , &:focus': {
      backgroundImage:
        'linear-gradient(rgba(255, 255, 255, 0),rgba(255, 255, 255, 0)),linear-gradient(101deg, #5191d5, #d31297)',
      backgroundClip: 'content-box, border-box',
      backgroundOrigin: ' border-box',
      border: 'solid 2px transparent',
      backgroundColor: 'transparent',
      color: variables.text,
    },
  },
  solid: {
    backgroundColor: variables.text,
    color: variables.bg2,
    borderRadius: radii[5],
    fontSize: fontSizes[3],
    fontWeight: fontWeights.medium,
    border: `${borders[2]} ${variables.text}`,
    '&:hover': {
      color: variables.bg2,
      backgroundColor: variables.text,
      border: `${borders[2]} ${variables.text}`,
    },
    '&:focus': {
      color: variables.bg2,
      backgroundColor: variables.text,
      border: `${borders[2]} ${variables.text}`,
    },
  },
  primaryLight: {
    backgroundColor: variables.bg1,
    color: variables.text,
    borderRadius: radii[5],
    fontSize: fontSizes[3],
    fontWeight: fontWeights.medium,
    border: `${borders[2]} transparent`,
    '&:hover': {
      backgroundColor: variables.bg1,
      color: variables.text,
      border: `${borders[2]} transparent`,
    },
    '&:focus': {
      backgroundColor: variables.bg1,
      color: variables.text,
      border: `${borders[2]} transparent`,
    },
  },
}

export const theme = {
  fontSizes,
  lineHeights,
  fontWeights,
  breakpoints,
  buttons,
  media: { xxs, xs, sm, md, lg, xlg },
  sizes,
  colors: {
    black: '#2c2f42', // default
    grey: '#777777',
    greySecondary: '#53576d',
    greyMedium: '#aaaaaa',
    greyLight: '#cccccc',
    greyLighter: '#f6f6f6',
    transparentGreyLighter: 'rgb(246 246 246 / 18%)',
    white: '#ffffff',
    blackSecondary: '#333333',
    inputPlaceholder: '#999999',
    warning: '#FB8B03',
    danger: '#F44336',
    info: '#3498DB',
    success: '#1CAD45',
    linkColor: colors.primary,
    linkHoverColor: colors.primaryDark,
    buttonSecondary: '#ffeae9',
    buttonSecondaryDark: '#ffdcdb',
    lightViolet: '#fbfaff',
    greyViolet: '#f7f5fa',
    green: '#1dc886',
    darkGreen: '#058856',
    black50: 'rgb(32 43 69 / 50%)',
    grey10: '#e0e0e0',
    white10: 'rgba(23, 18, 57, 0.1)',
    primary5: 'rgba(230,30,11,0.05)',
    red: '#ee5e51',
    // ...colors,
    ...variables,
  },

  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em',
    progress: '0.17px',
  },
  borders,
  radii,
  width: [16, 32, 64, 128, 256, '50%', '100%'],
  heights: [16, 32, 64, 128, 256, 512],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1280, 1536],
  space: [0, 4, 8, 16, 32, 40, 64, 128, 256, 512], // 8's magic.
  shadows: [
    '0 11px 32px 0 rgba(52, 42, 128, 0.2)', // Index in course card
    ' 0 4px 10px 0 rgba(0, 0, 0, 0.06)', // Card's shadow in dashboard
    '0 10px 30px 0 rgba(52, 42, 128, 0.2)', // Step Circular Text
    '0 1px 0 0 #e9ebed', // Chapter header
    '0 30px 40px 0 rgba(210, 213, 218, 0.2)', // Chapter content
    // these are dummy values.
    '0 0 12px 0 rgba(72, 90, 206, 0.16)',
    '0 0 31px 0 rgba(72, 90, 206, 0.25)',
    '0 0 12px 0 rgba(72, 90, 206, 0.3)',
    '0 0 12px 0 rgba(72, 90, 206, 0.7)',
    '0 0 6px 0 rgba(0, 0, 0, 0.48)',
    '0 -3px 6px 0 rgba(72, 90, 206, 0.16)',
    '0 30px 40px 0 rgba(51, 31, 120, 0.06)',
  ],

  // GUTTER
  baseGutter: 8,
  zIndexes: [0, 1, 2, 3, 500, 9000, 10000, 100001, 100002],
}
