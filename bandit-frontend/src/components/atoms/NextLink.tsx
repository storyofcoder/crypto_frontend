import { forwardRef } from "react";
import styled from "styled-components";
import NextLink from "next/link";

const A = styled.a``

/**
 * temporary solution for migrating React Router to Next.js Link
 */
export const NextLinkFromReactRouter = forwardRef<any, any>(
  ({ to, replace, children, prefetch, shallow, ...props }, ref) => (
    <NextLink href={to as string} replace={replace} passHref prefetch={prefetch} shallow={shallow}>
      <A ref={ref} {...props}>
        {children}
      </A>
    </NextLink>
  ),
)
