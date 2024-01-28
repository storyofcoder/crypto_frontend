const lightGrey = {
  grey100: 'var(--lightGrey100)',
  grey200: 'var(--lightGrey200)',
  grey300: 'var(--lightGrey300)',
  grey400: 'var(--lightGrey400)',
  grey500: 'var(--lightGrey500)',
  grey600: 'var(--lightGrey600)',
  grey700: 'var(--lightGrey700)',
  grey800: 'var(--lightGrey800)',
  grey900: 'var(--lightGrey900)',
}

const darkGrey = {
  grey100: 'var(--darkGrey100)',
  grey200: 'var(--darkGrey200)',
  grey300: 'var(--darkGrey300)',
  grey400: 'var(--darkGrey400)',
  grey500: 'var(--darkGrey500)',
  grey600: 'var(--darkGrey600)',
  grey700: 'var(--darkGrey700)',
  grey800: 'var(--darkGrey800)',
  grey900: 'var(--darkGrey900)',
}

export const baseColors = {
  failure: 'var(--failure)',
  primary: 'var(--primary)',
  primaryBright: 'var(--primaryBright)',
  primaryDark: 'var(--primaryDark)',
  secondary: 'var(--secondary)',
  success: 'var(--success)',
  error: 'var(--error)',
  warning: 'var(--warning)',
  black: 'var(--black)',
  white: 'var(--white)',
}


export const lightColors = {
  ...baseColors,
  ...lightGrey,
  invertGrey: lightGrey,
  background: 'var(--background)',
  backgroundDisabled: 'var(--backgroundDisabled)',
  backgroundAlt: 'var(--backgroundAlt)',
  backgroundAlt2: 'var(--backgroundAlt2)',
  foreground: 'var(--foreground)',
  border: 'var(--border)',
  cardBorder: 'var(--cardBorder)',
  contrast: 'var(--contrast)',
  dropdown: 'var(--dropdown)',
  dropdownDeep: 'var(--dropdownDeep)',
  invertedContrast: 'var(--invertedContrast)',
  input: 'var(--input)',
  inputSecondary: 'var(--inputSecondary)',
  tertiary: 'var(--tertiary)',
  text: 'var(--text)',
  textDisabled: 'var(--textDisabled)',
  textSubtle: 'var(--textSubtle)',
  disabled: 'var(--disabled)',
  headerBorderBottom: 'var(--header-border-bottom)',
  headerBackground: 'var(--header-background)',

  shadows:{
    small: 'var(--shadow-small)',
    medium: 'var(--shadow-medium)',
    large: 'var(--shadow-large)',
  },

  gradients: {},
}

export const darkColors = {
  ...baseColors,
  ...darkGrey,
  invertGrey: darkGrey,
  background: 'var(--background)',
  backgroundDisabled: 'var(--backgroundDisabled)',
  backgroundAlt: 'var(--backgroundAlt)',
  backgroundAlt2: 'var(--backgroundAlt2)',
  foreground: 'var(--foreground)',
  border: 'var(--border)',
  cardBorder: 'var(--cardBorder)',
  contrast: 'var(--contrast)',
  dropdown: 'var(--dropdown)',
  dropdownDeep: 'var(--dropdownDeep)',
  invertedContrast: 'var(--invertedContrast)',
  input: 'var(--input)',
  inputSecondary: 'var(--inputSecondary)',
  tertiary: 'var(--tertiary)',
  text: 'var(--text)',
  textDisabled: 'var(--textDisabled)',
  textSubtle: 'var(--textSubtle)',
  disabled: 'var(--disabled)',
  gradients: {},
  headerBorderBottom: 'var(--header-border-bottom)',
  headerBackground: 'var(--header-background)',

  shadows:{
    small: 'var(--shadow-small)',
    medium: 'var(--shadow-medium)',
    large: 'var(--shadow-large)',
  },


}
