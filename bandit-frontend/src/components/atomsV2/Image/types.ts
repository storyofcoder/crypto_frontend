import { HTMLAttributes, ImgHTMLAttributes, ReactElement } from "react";
import { SpaceProps } from "styled-system";

export interface WrapperProps extends SpaceProps, HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, SpaceProps {
  width: number;
  height: number;
  wrapperProps?: WrapperProps;
}

export interface BackgroundImageProps extends ImageProps {
  loadingPlaceholder?: ReactElement;
  borderRadius : any
}

export const variants = {
  DEFAULT: "default",
  INVERTED: "inverted",
} as const;

export type Variant = typeof variants[keyof typeof variants];

export interface TokenPairImageProps {
  primarySrc: string;
  secondarySrc: string;
  variant?: Variant;
  height: number;
  width: number;
  primaryImageProps?: Omit<ImageProps, "width" | "height">;
  secondaryImageProps?: Omit<ImageProps, "width" | "height">;
}
