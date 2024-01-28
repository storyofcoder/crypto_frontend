import { ElementType, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import { PolymorphicComponentProps } from "../utils/polymorphic";

export const scales = {
  MD: "md",
  SM: "sm",
  XS: "xs",
} as const;

export const cap = {
  RADIUS0: "RADIUS0",
  RADIUS6: "RADIUS6",
  RADIUS12: "RADIUS12",
  ROUNDED: "ROUNDED"
} as const;

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  TEXT: "text",
  DEFAULT: "default",
  SUBTLE: "subtle",
  LINK: "link",
} as const;

export type Scale = typeof scales[keyof typeof scales];
export type Caps = typeof cap[keyof typeof cap];
export type Variant = typeof variants[keyof typeof variants];

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: "a" | "button" | ElementType;
  external?: boolean;
  isLoading?: boolean;
  scale?: Scale;
  cap?: Caps,
  variant?: Variant;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>;
