import { cap, scales, variants } from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '48px',
    fontSize: '16px',
    padding: '0 24px',
  },
  [scales.SM]: {
    height: '38px',
    fontSize: '14px',
    padding: '0 16px',
  },
  [scales.XS]: {
    height: '31px',
    fontSize: '12px',
    padding: '0 8px',
  },
}
export const capVariants = {
  [cap.RADIUS0]: {
    borderRadius: '0px',
  },
  [cap.RADIUS6]: {
    borderRadius: '6px',
  },
  [cap.RADIUS12]: {
    borderRadius: '12px',
  },
  [cap.ROUNDED]: {
    borderRadius: '24px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: 'foreground',
    border: '1px solid',
    borderColor: 'foreground',
    color: 'background',
    ':hover:not(:disabled)': {
      border: '1px solid',
      borderColor: 'foreground',
      backgroundColor: 'transparent',
      color: 'foreground',
    },
    // ":focus":{
    //   boxShadow: "0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px #DCD4FF"
    // }
  },
  [variants.SECONDARY]: {
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: 'border',
    boxShadow: 'none',
    color: 'text',
    ':hover:not(:disabled)': {
      border: '1px solid',
      borderColor: 'foreground',
      color: 'foreground',
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: 'foreground',
    boxShadow: 'none',
    color: 'foreground',
    ':disabled': {
      backgroundColor: 'transparent',
    },
    // ":focus":{
    //   boxShadow: "0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px #DCD4FF"
    // }
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'foreground',
    boxShadow: 'none',

  },
  [variants.SUBTLE]: {
    backgroundColor: 'invertGrey.grey400',
    color: 'text',
    boxShadow: 'none',
  },
  [variants.LINK]: {
    backgroundColor: 'transparent',
    color: 'foreground',
    boxShadow: 'none',
    borderRadius: "unset !important",
    padding: "0",
    height: "20px !important",
    borderBottom: "1px solid",
    borderColor: "transparent",

    "&:hover":{
      borderColor: "foreground"
    }
  },
}
