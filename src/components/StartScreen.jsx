import React from "react";
import styled from "styled-components";
import { Button, FlexDiv } from "./ReplayScreen";

const StyledPara = styled.p`
  font-family: "Press Start 2P", cursive;
  font-size: 2rem;
`;

const StartScreen = ({ startGame, displayValue }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "skyblue",
        display: displayValue,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlexDiv>
        <StyledPara>Flappy Birb</StyledPara>
        <Button onClick={startGame}>Start</Button>
      </FlexDiv>
    </div>
  );
};

export default StartScreen;
