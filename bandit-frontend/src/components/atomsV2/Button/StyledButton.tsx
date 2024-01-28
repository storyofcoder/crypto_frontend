import styled, { DefaultTheme } from "styled-components";
import { layout, space, variant } from "styled-system";
import { capVariants, scaleVariants, styleVariants } from "./theme";
import { BaseButtonProps } from "./types";

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme;
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean;
}

const getDisabledStyles = ({ $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.bandit-button--disabled {
        cursor: not-allowed;
        pointer-events: none;
      }
    `;
  }

  return `
    &:disabled,
    &.bandit-button--disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
      pointer-events: none;
    }
  `;
};

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? ".5" : "1";
};

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  // &:hover:not(:disabled):not(.bandit-button--disabled):not(.bandit-button--disabled):not(:active) {
  //   color: ${({theme})=>theme.colors.text};
  // }
  //
  // &:active:not(:disabled):not(.bandit-button--disabled):not(.bandit-button--disabled) {
  //   transform: translateY(1px);
  //   box-shadow: none;
  // }

  ${getDisabledStyles}
  ${variant({
  prop: "scale",
  variants: scaleVariants,
})}
  ${variant({
  variants: styleVariants,
})}
  ${variant({
    prop: "cap",
    variants: capVariants,
  })}
  ${layout}
  ${space}
`;

export default StyledButton;
