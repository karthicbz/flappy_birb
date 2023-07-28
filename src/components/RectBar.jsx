import React from "react";
import { styled } from "styled-components";

const GreenTube = styled.div`
  position: absolute;
`;

const RectBar = ({
  height,
  right = "-100px",
  top,
  bottom,
  greenTubeRef,
  backgroundColor,
}) => {
  return (
    <GreenTube
      style={{
        width: "100px",
        height: `${height}px`,
        background: backgroundColor,
        right,
        top,
        bottom,
        transition: "right ease .8s, background ease 0.1s",
      }}
      ref={greenTubeRef}
    ></GreenTube>
  );
};

export default RectBar;
