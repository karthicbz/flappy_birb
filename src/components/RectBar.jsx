import React from "react";
import { styled } from "styled-components";

const GreenTube = styled.div`
  position: absolute;
  top: 0;
`;

const RectBar = ({ height, right = "-100px" }) => {
  return (
    <GreenTube
      style={{
        width: "100px",
        height: `${height}px`,
        background: "green",
        right,
      }}
    ></GreenTube>
  );
};

export default RectBar;
