import React from "react";
import styled from "styled-components";

const PlayerDiv = styled.div`
  width: 80px;
  height: 30px;
  background-color: blue;
  position: absolute;
  left: calc((500px - 80px) - 50%);
`;

const Player = ({ bottom }) => {
  return <PlayerDiv style={{ bottom }}></PlayerDiv>;
};

export default Player;
