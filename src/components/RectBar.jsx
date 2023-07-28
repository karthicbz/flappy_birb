import React from "react";
import { styled } from "styled-components";

const GreenTube = styled.div`
  position: absolute;
`;

const RectBar = ({ height, right = "-100px", top, bottom, greenTubeRef }) => {
  return (
    <GreenTube
      style={{
        width: "100px",
        height: `${height}px`,
        background: "green",
        right,
        top,
        bottom,
      }}
      ref={greenTubeRef}
    ></GreenTube>
  );
};

export default RectBar;
