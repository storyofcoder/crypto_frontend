import styled from "styled-components";
import { Box } from "../../components/atoms/StyledSystem";

export const Container = styled(Box)`
  min-height: 70vh;
  ${(p) => p.theme.media.xs} {
    padding: 40px 20px 20px 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 40px 20px 20px 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 40px 20px 20px 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 40px 20px 20px 20px;
    width: 1040px;
    margin: 0 auto;
  }

  .guidelines-image {
    width: 100%;
    height: 100%;
  }
`

export const DocumentContainer = styled(Box)`
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;

  ${(p) => p.theme.media.xlg} {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 10px 40px 0 40px;
  }
`

export const CardWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  .wrapper {
    display: grid;

    gap: 86px;
    color: ${(p) => p.theme.colors.text};

    ${(p) => p.theme.media.lg} {
      grid-template-columns: 430px 312px;
    }
    ${(p) => p.theme.media.xlg} {
      grid-template-columns: 430px 312px;
    }
  }

  .ant-spin-dot-item {
    background-color: ${(p) => p.theme.colors.text};
  }
`
