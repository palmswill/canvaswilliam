import styled from "styled-components";

const Rectangle = styled.div.attrs(({ x, y, width,length }) => ({
  style: {
    transform: `translate(${x - width}px, ${y - length}px)`
  }
}))`
  cursor: grab;
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: red;
  

  ${({ dragging }) =>
    dragging &&
    `
    opacity: 0.8;
    cursor: grabbing;
  `}
`;

export default Rectangle;
