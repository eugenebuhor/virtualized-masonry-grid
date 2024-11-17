import styled, { css } from 'styled-components';

export const GridContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const GridItem = styled.div<{
  $translateX: number;
  $translateY: number;
  $width: number;
  $height: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${(props) =>
    css`translateX(${props.$translateX}px) translateY(${props.$translateY}px)`};
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;
