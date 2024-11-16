import styled, { css } from 'styled-components';

export const StyledImage = styled.img<{ $fill?: boolean; $blurred?: boolean }>`
  ${(props) =>
    props.$fill &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    `}

  transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;

  ${(props) =>
    props.$blurred
      ? css`
          filter: blur(4px);
          opacity: 0.95;
        `
      : css`
          filter: blur(0);
          opacity: 1;
        `}
`;
