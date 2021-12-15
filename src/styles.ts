import styled, { css } from "styled-components";
import { theme } from "@nordcloud/gnui";

export const Wrapper = styled.div`
  text-align: center;
`;

export const Box = styled.div({
  background: "#1e1c32",
  padding: theme.spacing.spacing06,
});

export const buttonCss = css`
  padding: ${theme.spacing.spacing02};
  margin-bottom: ${theme.spacing.spacing04};
`;
