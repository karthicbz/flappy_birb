import React from "react";
import styled from "styled-components";

export const Button = styled.button`
  padding: 8px;
  border: 3px solid orange;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ReplayScreen = ({ displayValue, score, replayGame }) => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "palevioletred",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: displayValue,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <FlexDiv>
        <p
          style={{ fontSize: "4rem", fontFamily: "'Press Start 2P', cursive" }}
        >
          {score}
        </p>
        <Button onClick={replayGame}>Replay</Button>
      </FlexDiv>
    </div>
  );
};

export default ReplayScreen;
