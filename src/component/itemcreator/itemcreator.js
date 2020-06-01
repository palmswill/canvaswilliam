import styled from "styled-components";

const Rectangle = styled.div.attrs((props) => ({
  style: {
    width:`${props.width}px`,
    height:`${props.height}px`,
    "zIndex":`${props.zdex}`,
    opacity:`${props.opacity}`,
    transform: `translate(${props.x}px, ${props.y}px)`,
  }
}))`
  cursor: grab;
  position: absolute;
  resize:both;
  
  
  ${({ dragging,resizing}) =>
    (dragging||resizing) &&
    `
    border-style:dashed;
    opacity: 0.8;
    cursor: grabbing;
  `}
`;

export default Rectangle;
