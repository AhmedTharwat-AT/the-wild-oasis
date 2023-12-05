import { css, styled } from "styled-components";

const Heading = styled.h1`
  ${(p) =>
    p.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(p) =>
    p.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(p) =>
    p.as === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 500;
    `}
  ${(p) =>
    p.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
`;

export default Heading;
