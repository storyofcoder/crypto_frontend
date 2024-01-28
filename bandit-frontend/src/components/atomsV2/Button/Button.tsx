import React, { cloneElement, ElementType, isValidElement } from "react";
import StyledButton from "./StyledButton";
import { ButtonProps, cap, scales, variants } from "./types";

const getExternalLinkProps = (): { target: string; rel: string } => ({
  target: "_blank",
  rel: "noreferrer noopener",
});


const Button = <E extends ElementType = "button">(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, external, className, isLoading, disabled, children, ...rest } = props;
  const internalProps = external ? getExternalLinkProps() : {};
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];

  if (isLoading) {
    classNames.push("bandit-button--loading");
  }

  if (isDisabled && !isLoading) {
    classNames.push("bandit-button--disabled");
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(" ")}
      disabled={isDisabled}
      {...internalProps}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
        cloneElement(startIcon, {
          mr: "0.5rem",
        })}
        {children}
        {isValidElement(endIcon) &&
        cloneElement(endIcon, {
          ml: "0.5rem",
        })}
      </>
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
  cap: cap.RADIUS12
};

export default Button;
